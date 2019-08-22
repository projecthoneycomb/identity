import express from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import { start } from './helpers/logging';

// Loading the .env variable into the node process.
config();
const port = process.env.PORT;

// Loading app insights to start capturing logs
start();

const app = express();
app.use(helmet());

app.listen(port, () => console.log(`Identity server is running on port: ${port}`));