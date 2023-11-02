const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());

const apiKey = process.env.API_KEY;
const baseURL = process.env.BASE_URL;

// Modified the route to specify 'home.json' directly
app.get('/svc/topstories/v2/home.json', (req, res) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'api-key': apiKey
      }
    };

    const reqURL = `http://api.nytimes.com/svc/topstories/v2/home.json`; // Specifying home.json

    const request = http.request(reqURL, options, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
      });
    });

    request.on('error', error => {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Could not fetch stories' });
    });

    request.end();
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Could not process request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
