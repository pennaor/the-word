import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

async function fetchAPI(method, url, data = {}) {
  const token = localStorage.getItem('__blog-word') || '';
  const fetch = axios.create({
    baseURL: `${PROTOCOL}://${HOST}`,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  return fetch.request({ method, url, data });
}

export default fetchAPI;
