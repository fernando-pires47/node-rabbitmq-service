import { consume } from './consumer';
import { produce } from './producer';
import * as dotenv from 'dotenv';

const result = dotenv.config({ path: '.env' });
if (result.error) console.error(result.error);

const CONSUMER_DISABLE = process.env.CONSUMER_DISABLE == 'true'; // Disable consumer
const PRODUCER_DISABLE =  process.env.PRODUCER_DISABLE == 'true'; //Disable producer

async function start(): Promise<void> {
  if(!CONSUMER_DISABLE){
    await consume();
  }
  if(!PRODUCER_DISABLE){
    await produce();
  }
} 

start();


