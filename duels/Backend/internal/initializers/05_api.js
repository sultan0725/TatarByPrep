const axios = require('axios').default;

// global.api = axios.create({
//     base_url: global.config.api_url,
//     timeout: 3000,
//     responseType: 'json'
// })
axios.defaults.baseURL = global.config.api_url;
axios.defaults.timeout = 3000;
axios.defaults.responseType = 'json';
// module.exports = global.api;