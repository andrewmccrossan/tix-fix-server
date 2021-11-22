const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// const mongodb_uri = process.env.MONGODB_URI;
// await mongoose.connect(mongodb_uri);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// require('./services/accounts-service')(app);

app.listen(process.env.PORT || 4000);