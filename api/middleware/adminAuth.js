const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    //token is stored in the cookies
    const token = req.cookies.jwt;
    //if the token is not present
    if (!token) {
        return res.status(401).json({status:'Unauthorized', message: 'No token found' });
    }

    //verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
        return res.status(403).json({status:"Unauthorized", message: 'Invalid token.Login again' });
        }

        next();
    });
}