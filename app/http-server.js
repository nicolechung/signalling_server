'use strict';

const express = require('express');
const http = require('http');
// Constants
const PORT = process.env.PORT || 5432;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    res.send('Hello this is a test \n');
});

module.exports = app;