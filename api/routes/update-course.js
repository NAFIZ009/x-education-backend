//importing mongodb client
const { ObjectId } = require('mongodb');
const client = require('../../config/db');
const getCourse=require('../routes/get-course');

/*
 the updated course format is-
 {
    _id: the course id,
    updatedProperties: the updated properties values,
    ....
 }
*/
//update course function
module.exports= async (req,res)=>{
    const data=req.body;
    try{
        //mongodb operations
        const database = client.db("x-education");
        const course = database.collection("course");
        //getting specified course
        const id = { _id:new ObjectId(data._id) };
        //getting only the updated data without the course id
        const { _id, ...givenData } = data;
        //setting the updated data
        const updatedData={
            $set:{
                ...givenData
            }
        }
        //updating course
        const courseInfo = await course.updateOne(id,updatedData,{ upsert: false });

        //if course is updated
        if(courseInfo.modifiedCount>0)
        {
            const updatedCourse=await getCourse(null,null,_id);
            //sending the updated course
            res.send({
            status:"Success",
            updated:true,
            updatedCourse
            });

        }
        //if course is not found
        else if(courseInfo.matchedCount==0)
        {
            //sending the message for not founding the course
            res.send({
                status:"Unsuccessful",
                updated:false,
                message:"Course not found"
            });
        }
        //if already updated
        else
        {
            //sending the message for already updated
            res.send({
                status:"Unsuccessful",
                updated:false,
                message:"This change is already Updated"
            });
        }
    }catch(err){
        //consoling error
        console.error(err);
        //if an error occurred
        res.status(404).send({
            status:"error",
            message:"server error",
        });
    }
}