//root file
//module importing
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const client=require('./config/db.js');

//creating a new server
const app = express();

// Using cors middleware
app.use(cors());
//for parsing
app.use(express.json());
//for cookies
app.use(cookieParser());

//test
app.get('/test', (req, res) => {
    res.send("hello world!");
});

//login api
app.post('/admin/login',async (req, res) => {
    //create a admin password hash
    //this hash will be stored in the db
    //username : admin@xEdu.com
    //password : admin99123
    /*
    const saltRounds=10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log(salt);
        const password="admin99123";
        bcrypt.hash(password, salt,(err, hash)=>{
            // Store hash in your password DB.
            console.log(hash)
        });
    });
    */
    const { username, password } = req.body;
  
    //database connection
    const database = client.db("x-education");
    const adminInfo = database.collection("adminInfo");

    //retrieve information of admin
    const admin=await adminInfo.findOne({username});
  
    if (!admin) {
      return res.status(401).json({status:'Unsuccessful', message: 'Invalid username' });
    }
    //check password
    bcrypt.compare(password, admin.hash, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(401).json({status:'Unsuccessful', message: 'server error' });
        }
      
        if (result) {
            console.log('Password is correct!');
            // Generate JWT token
            const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
            // Set the token as a cookie in the response
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Expires in 1 hour (in milliseconds)
        
            // Respond with the token (you might also include additional user data in the response)
            res.json({status:"successfully logged in", token });
        } else {
            console.log('Password is incorrect!');
            return res.status(401).json({status:'Unsuccessful', message: 'Invalid password' });
        }
    });
});

//'/api' router
app.use('/api',require('./api/api.js'));

//port of the server
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("listening on port ",PORT);
});