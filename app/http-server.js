'use strict';

const express = require('express');

// App
const app = express();
app.use(require('helmet')());

app.get('/', (req, res) => {
    console.log('REQUEST RECEIVED')
    res.send('Hello this is a test part 3 \n');
});

module.exports = app;