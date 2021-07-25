// APP 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//LISTENING SERVER
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Starting Server Account API');
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
console.log('Welcome to Account API');

// CONNECT DB
const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
    process.env.Account_DB_Connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to Neptune DB')
);

//ROUTES
app.get('/', (req, res) => {
    res.send("we are on home");
});

// IMPORT ROUTES USER
const userRoute = require('./routes/user');
app.use('/user', userRoute);



