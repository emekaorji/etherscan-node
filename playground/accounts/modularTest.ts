import '../env';

import { AccountsModule } from '../../src';
import { runScript } from '../utils';

const accounts = new AccountsModule({
  apiKey: process.env.ETHERSCAN_API_KEY!,
  address: '0xb8c6A5E906a832A4927576501eBB7a7a6DdDda25',
});

async function main() {
  return await accounts.getBalance();
}

runScript(main, 'Get Address Balance');
