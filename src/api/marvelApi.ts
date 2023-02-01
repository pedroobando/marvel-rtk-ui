import axios from 'axios';

const marvelApi = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
  params: {
    ts: 1,
    apikey: 'eda8145b2bb7e1f4eedadbb494763b53',
    hash: '6eea00b435ee472b23476159337323fb',
  },
});

export default marvelApi;
