import express from 'express';
import process from 'process';
import { connectToDatabase } from './config/dbClient';
import { router } from "./routes/routes";
import morgan from 'morgan';

export const app = express();

app.use(morgan('dev'))

app.use(express.json());

const PORT = process.env.PORT;

app.use('/api', router);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Hello on port ${PORT}`);
})
