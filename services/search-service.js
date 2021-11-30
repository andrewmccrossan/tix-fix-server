const axios = require('axios');

const SEATGEEK_CLIENT_ID = process.env.SEATGEEK_CLIENT_ID || 'MjQ1OTcxNTl8MTYzNzcxOTI2MC4yNzYwMTM';
const SEATGEEK_CLIENT_SECRET = process.env.SEATGEEK_CLIENT_SECRET || '3218bfa9ff53979b799a09b011e3cc1339194e7f03c8d8caefcd6cdf2177724c';

module.exports = (app) => {

    const getSearchResults = (req, res) => {
        const query = req.params.query;
        axios.get(`https://api.seatgeek.com/2/events?q=${query}&client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`)
            .then(response => res.json(response.data))
    }
    app.get('/search/:query', getSearchResults);
}