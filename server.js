const express = require('express');
const app = express();

const CLIENT_URL = process.env.NODE_ENVIRONMENT ? 'https://wonderful-borg-e1f3bc.netlify.app' : 'http://localhost:3000';
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Credentials");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tix-fix', { useUnifiedTopology: true, useNewUrlParser: true });
//mongoose.connect('mongodb+srv://andrewmcc:bsEqmw74dahTS7d@tix-fix-east.p5uyl.mongodb.net/tixFixDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    cookie: { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' }
                }
                )
);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

require('./services/search-service')(app);
require('./services/events-service')(app);
require('./services/session-service')(app);

app.listen(process.env.PORT || 4000);