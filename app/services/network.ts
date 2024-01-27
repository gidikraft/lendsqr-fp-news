import {getFromLS} from '@/utils/storage';

import axios from 'axios';

// const today = new Date();
// const API_KEY = '9f80026d02654659b63626deb0dfb4bc';
// const url = `https://newsapi.org/v2/everything?q=nigeria&from=${today}&sortBy=publishedAt&apiKey=${API_KEY}&pageSize=10&page=1`;
const url = 'https://jsonplaceholder.typicode.com/';

export const SERVER = axios.create({
  baseURL: url,
});

SERVER.interceptors.request.use(
  async config => {
    const token = await getFromLS('__token__');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.log(`axios helper error: ${error}`);
    return Promise.reject(error);
  },
);
