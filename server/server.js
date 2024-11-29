const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/bbc-articles', async (req, res) => {
    try {
        const response = await axios.get('https://www.bbc.com');
        const html = response.data;
        const $ = cheerio.load(html);

        const articles = [];
        $('.media__content').each((index, element) => {
            const header = $(element).find('h3').text().trim();
            const description = $(element).find('p').text().trim();
            
            if (header && description) {
                articles.push({ header, description });
            }
        });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from BBC.' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
