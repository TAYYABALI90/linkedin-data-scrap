import express from 'express';
import { scrapeJobs } from '../controllers/jobs.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const { url } = req.query;

    try {

        const jobsData = await scrapeJobs(url);
        res.json(jobsData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };

});

export default router;