/**
 * HTTP client for making API requests
 */
import {
  EtherscanAPIError,
  EtherscanNetworkError,
  APIResponse,
} from '../types';

export interface HttpClientOptions {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly headers: Record<string, string>;
  private rateLimitEnabled: boolean = true;
  private maxRequestsPerSecond: number = 5;
  private requestQueue: Array<() => Promise<void>> = [];
  private processingQueue: boolean = false;
  private requestsThisSecond: number = 0;
  private rateLimitTimer: NodeJS.Timeout | null = null;

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl;
    this.timeout = options.timeout || 30000;
    this.headers = options.headers || {};
  }

  /**
   * Set rate limiting configuration
   */
  public setRateLimit(
    enabled: boolean,
    maxRequestsPerSecond: number = 5
  ): void {
    this.rateLimitEnabled = enabled;
    this.maxRequestsPerSecond = maxRequestsPerSecond;
  }

  /**
   * Make a GET request to the API
   */
  public async get<T>(
    path: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Promise<T> {
    // Build query string from parameters
    const queryParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join('&');

    const url = `${this.baseUrl}${path}${
      queryParams ? (path.includes('?') ? '&' : '?') + queryParams : ''
    }`;

    return this.request<T>(url);
  }

  /**
   * Make a POST request to the API
   */
  public async post<T>(
    path: string,
    data: Record<string, any> = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const options: RequestInit = {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return this.request<T>(url, options);
  }

  /**
   * Make a request with rate limiting if enabled
   */
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    if (this.rateLimitEnabled) {
      return this.rateLimit<T>(() => this.makeRequest<T>(url, options));
    }

    return this.makeRequest<T>(url, options);
  }

  /**
   * Make the actual HTTP request
   */
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Add timeout support with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...(options.headers || {}),
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new EtherscanNetworkError(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Check if this is an Etherscan API response with error
      if (
        this.isAPIResponse(data) &&
        data.status === '0' &&
        data.message.startsWith('NOTOK')
      ) {
        throw new EtherscanAPIError(data.result, data.message);
      }

      return data as T;
    } catch (error) {
      if (
        error instanceof EtherscanAPIError ||
        error instanceof EtherscanNetworkError
      ) {
        throw error;
      }

      // Handle timeout errors
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new EtherscanNetworkError(
          `Request timed out after ${this.timeout}ms`
        );
      }

      throw new EtherscanNetworkError(
        `Request failed: ${(error as Error).message}`
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Apply rate limiting to API requests
   */
  private async rateLimit<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const executeRequest = async () => {
        try {
          // Check if we're at the rate limit
          if (this.requestsThisSecond >= this.maxRequestsPerSecond) {
            // Wait until the next second
            await new Promise((r) => setTimeout(r, 1000));
            this.requestsThisSecond = 0;
          }

          // Increment request counter
          this.requestsThisSecond++;

          // Reset counter after a second
          if (!this.rateLimitTimer) {
            this.rateLimitTimer = setTimeout(() => {
              this.requestsThisSecond = 0;
              this.rateLimitTimer = null;
            }, 1000);
          }

          // Execute the request
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          // Process the next request in the queue
          this.processNextRequest();
        }
      };

      // Add to queue and process if not already processing
      this.requestQueue.push(executeRequest);

      if (!this.processingQueue) {
        this.processNextRequest();
      }
    });
  }

  /**
   * Process the next request in the queue
   */
  private processNextRequest(): void {
    if (this.requestQueue.length === 0) {
      this.processingQueue = false;
      return;
    }

    this.processingQueue = true;
    const nextRequest = this.requestQueue.shift();

    if (nextRequest) {
      nextRequest();
    }
  }

  /**
   * Type guard to check if an object is an Etherscan API response
   */
  private isAPIResponse(data: any): data is APIResponse<string> {
    return (
      data &&
      typeof data === 'object' &&
      'status' in data &&
      'message' in data &&
      'result' in data
    );
  }
}
