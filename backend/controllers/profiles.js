import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

export async function scrapeProfiles(url) {

    const profileData = [];

    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    try {

        await page.goto(url);
        await page.waitForTimeout(5000);

        const profileElements = await page.$$('li.pserp-layout__profile-result-list-item');
        console.log(`Number of profile elements found: ${profileElements.length}`);

        for (const profileElement of profileElements) {

            const profileDataItem = await profileElement.evaluate(element => {

                const imageElement = element.querySelector('img.artdeco-entity-image');
                const nameElement = element.querySelector('h3.base-search-card__title');
                const positionElement = element.querySelector('h4.base-search-card__subtitle');
                const locationElement = element.querySelector('p.people-search-card__location');
                const workElement = element.querySelector('.entity-list-meta__entities-list');
                const educationElement = element.querySelectorAll('.entity-list-meta__entities-list')[1];
                const linkElement = element.querySelector('a.base-search-card--link');

                return {

                    image: imageElement ? imageElement.getAttribute('src') : '',
                    name: nameElement ? nameElement.textContent.trim() : '',
                    position: positionElement ? positionElement.textContent.trim() : '',
                    location: locationElement ? locationElement.textContent.trim() : '',
                    work: workElement ? workElement.textContent.trim() : '',
                    education: educationElement ? educationElement.textContent.trim() : '',
                    link: linkElement ? linkElement.getAttribute('href') : ''

                };

            });

            console.log(profileDataItem);

            if (profileDataItem.image && !profileDataItem.image.startsWith('http')) {
                const baseURL = new URL(url);
                const imageURL = new URL(profileDataItem.image, baseURL).href;
                profileDataItem.image = imageURL;
            };

            profileData.push(profileDataItem);

        };

    } catch (error) {

        console.error('Error occurred while scraping profiles:', error);

    } finally {

        await page.close();
        await browser.close();

    };

    console.log('Scraped Profiles:', profileData);
    return profileData;

};

export default router;