import { EtherscanSDK } from '../src';

export async function runScript(
  runnableScript: (() => Promise<any>) | (() => any),
  title?: string
): Promise<void> {
  const startTime = Date.now();

  try {
    console.log(`Running: ${title || 'script'}...`);

    const result = await runnableScript();

    console.log('\n=======================================\n');
    console.log(result);
    console.log('\n=======================================\n');

    // If everything goes well, exit the process with code 0 (success)
    console.log(`Done in: ${(Date.now() - startTime) / 1000} seconds`);
    process.exit(0);
  } catch (error) {
    if (error instanceof EtherscanSDK.APIError) {
      console.error('API Error:', error.message, error.code);
    } else if (error instanceof EtherscanSDK.ValidationError) {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }

    // Exit with a non-zero code in case of failure
    console.log(`Errored after: ${(Date.now() - startTime) / 1000} seconds`);
    process.exit(1);
  }
}
