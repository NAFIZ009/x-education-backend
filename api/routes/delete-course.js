//importing mongodb client
const { ObjectId } = require('mongodb');
const client = require('../../config/db');

//delete course function
module.exports= async (req,res)=>{
    try{
        //mongodb operations
        const database = client.db("x-education");
        const course = database.collection("course");

        //check for course id
        if(req.query.id ){
            //getting specified course
            const id = { _id:new ObjectId(req.query.id) };
            const courseInfo = await course.deleteOne(id);
            console.log(courseInfo);

            //if course deleted successfully
            if(courseInfo.deletedCount>0)
            {
                res.send({
                status:"Success",
                message:"Course deleted successfully"
                });
            }else
            {
                res.send({
                    status:"Unsuccessful",
                    message:"Course is not available"
                });
            }
        }
        //if id is not specified
        else
        {
            //message for provided course id
            res.send({
                status:"Success",
                message:"Please provide id of course"
            });
        }
    }catch(err){
        //consoling error
        console.error(err);
        //if an error occurred
        res.status(404).send({
            status:"error",
            message:"Server error",
        });
    }
}