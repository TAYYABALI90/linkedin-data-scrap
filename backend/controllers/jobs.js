import express from "express";
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export async function scrapeJobs(url) {

    const jobData = [];

    try {

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const jobs = $('li');

        jobs.each((index, element) => {

            const jobImage = $(element).find('img.artdeco-entity-image').attr('src');
            const jobTitle = $(element).find('h3.base-search-card__title').text().trim();
            const company = $(element).find('h4.base-search-card__subtitle').text().trim();
            const location = $(element).find('span.job-search-card__location').text().trim();
            const time = $(element).find('time.job-search-card__listdate').text().trim();
            const link = $(element).find('a.base-card__full-link').attr('href');

            if (jobTitle && company && location && time && link) {

                const jobItem = {
                    image: jobImage,
                    title: jobTitle,
                    company: company,
                    location: location,
                    time: time,
                    link: link
                };

                jobData.push(jobItem);

            };

        });

        await delay(2000);

    } catch (error) {

        console.error(error);

    };

    console.log('Scraped Jobs:', jobData);
    return jobData;

};

export default router;