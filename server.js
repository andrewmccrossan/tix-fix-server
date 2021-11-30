const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tix-fix', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

require('./services/accounts-service')(app);
require('./services/search-service')(app);
require('./services/events-service')(app);

app.listen(process.env.PORT || 4000);