import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import jobsRoute from './routes/jobs.js';
import profilesRoute from './routes/profiles.js';

const app = express();

dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))

app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use(cors());

app.use('/jobs', jobsRoute);
app.use('/profiles', profilesRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on Port: http://localhost:${process.env.PORT}`)
});