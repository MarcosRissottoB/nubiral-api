import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database';

const PORT = '4000';

function main() {
  app.listen(PORT);
  console.log(`Server on port ${PORT}`);
}

main();