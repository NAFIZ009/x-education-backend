//API root file
//module importing
const express = require('express');
const api = express();

//test api
api.get('/test', (req, res) => {
    res.send("hello api!");
});

//api for create course
api.post('/course',require('./routes/create-course'));

//api for get courses
api.get('/course',require('./routes/get-course'));

module.exports =api;