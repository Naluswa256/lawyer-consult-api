const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const axiosClient = axios.create({
  baseURL: 'https://wallet.ssentezo.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((requestConfig) => {
  const apiUser = process.env.API_USER;
  const apiKey = process.env.API_KEY;
  const encodedString = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  // Create a new object to avoid modifying the original config object
  const modifiedConfig = {
    ...requestConfig,
    headers: {
      ...requestConfig.headers,
      Authorization: `Basic ${encodedString}`,
    },
  };
  return modifiedConfig;
});

module.exports = axiosClient;
