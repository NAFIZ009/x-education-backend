//importing mongodb client
const client = require('../../config/db');

//post request function
module.exports= async (req,res)=>{
    //course data
    const data=req.body;
    try{
        //mongodb operations
        const database = client.db("x-education");
        const course = database.collection("course");
        //inserting course data in courses collection
        await course.insertOne(data);
        //response for successful insert 
        res.send({
            status:"Success",
            message:"The course has been added successfully"
        });
    }catch(err){
        //consoling error
        console.error(err);
        //if an error occurred
        res.status(404).send({
            status:"error",
            message:"The course cannot be added"
        });
    }finally{
        //close the connection
        client.close();
    }
}