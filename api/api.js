//API root file
//module importing
const express = require('express');
const api = express();

//test api
api.get('/test', (req, res) => {
    res.send("hello api!");
});

module.exports =api;