//API root file
//module importing
const express = require('express');
const adminAuth = require('./middleware/adminAuth');
const api = express();

//test api
api.get('/test', (req, res) => {
    res.send("hello API!");
});

//api for create course
api.post('/course',adminAuth,require('./routes/create-course'));

//api for get courses
api.get('/course',require('./routes/get-course'));

//api for update courses
api.put('/course',adminAuth,require('./routes/update-course'));

//api for delete courses
api.delete('/course',adminAuth,require('./routes/delete-course'));

module.exports =api;