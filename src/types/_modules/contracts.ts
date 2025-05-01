/**
 * Contract module types
 */

export interface ABIRequest {
  address: string;
}

export interface ABIResponse {
  abi: string;
}

export interface SourceCodeRequest {
  address: string;
}

export interface SourceCodeResponse {
  SourceCode: string;
  ABI: string;
  ContractName: string;
  CompilerVersion: string;
  OptimizationUsed: string;
  Runs: string;
  ConstructorArguments: string;
  EVMVersion: string;
  Library: string;
  LicenseType: string;
  Proxy: string;
  Implementation: string;
  SwarmSource: string;
}
