import express from 'express';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Hello on port ${PORT}`);
})
