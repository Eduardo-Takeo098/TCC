const express = require('express');
const axios = require('axios');

const app = express();
const API_KEY = 'AIzaSyDnp6LRTU4hYJM0XjY57ywva2hfmiLweH4'; 

app.get('/directions', async (req, res) => {
  const { origin, destination } = req.query;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error getting directions:', error);
    res.status(500).json({ error: 'Failed to get directions' });
  }
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});
