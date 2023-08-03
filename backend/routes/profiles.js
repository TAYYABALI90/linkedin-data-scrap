import express from 'express';
import { scrapeProfiles } from '../controllers/profiles.js';

const router = express.Router();

router.get('/', async (req, res) => {
    
    const { url } = req.query;

    console.log(url);
    
    try {
    
        const profilesData = await scrapeProfiles(url);
        res.json(profilesData);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };

});

export default router;