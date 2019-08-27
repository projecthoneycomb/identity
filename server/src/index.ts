// Loading the .env variable into the node process.
import { config } from 'dotenv';
config();

import express from 'express';
import helmet from 'helmet';
import { json } from 'body-parser';
import { start } from './helpers/logging';
import organisationRouter from './routers/organisation-router';
import { handleError } from './middleware';

const port = process.env.PORT;

// Loading app insights to start capturing logs
start();

const app = express();
app.use(helmet());
app.use(json());

app.use('/organisations', organisationRouter);

app.use(handleError);

app.listen(port, () => console.log(`Identity server is running on port: ${port}`));