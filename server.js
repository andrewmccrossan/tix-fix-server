const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

require('./services/accounts-service')(app);

app.listen(process.env.PORT || 4000);
