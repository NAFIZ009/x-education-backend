//importing mongodb client
const { ObjectId } = require('mongodb');
const client = require('../../config/db');

//get course list function
module.exports= async (req,res)=>{
    try{
        //mongodb operations
        const database = client.db("x-education");
        const course = database.collection("course");

        //if the function is called from the update route then this segment will run
        if(req.updatedDataId)
        {
            //getting specified course
            const id = { _id:new ObjectId(req.updatedDataId) };
            const courseInfo = await course.findOne(id);
            return courseInfo;
        }

        //check for course id
        if(req.query.id ){
            //getting specified course
            const id = { _id:new ObjectId(req.query.id) };
            const courseInfo = await course.findOne(id);
            //send course of specified id
            res.send({
            status:"Success",
            course:courseInfo
            });
        }
        //if id is not specified then all courses will be returned
        else
        {
            //getting all courses and returned them as array
            const courseInfo = await course.find().toArray();
            //sending array of courses
            res.send({
                status:"Success",
                course:courseInfo
            });
        }
    }catch(err){
        //consoling error
        console.error(err);
        //if an error occurred
        res.status(404).send({
            status:"error",
            message:"Not Found Any Course",
        });
    }
}