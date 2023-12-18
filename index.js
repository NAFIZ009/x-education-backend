//root file
//module importing
const express = require('express');
const cors = require('cors');

//creating a new server
const app = express();

// Using cors middleware
app.use(cors());

//test
app.get('/test', (req, res) => {
    res.send("hello world!");
});

//'/api' router
app.use('/api',require('./api/api.js'));

//port of the server
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("listening on port ",PORT);
});