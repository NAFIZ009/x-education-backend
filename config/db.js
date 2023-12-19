//mongodb configuration
const { MongoClient, ServerApiVersion } = require('mongodb');
//mongodb url, password is in env file for security purposes
const uri = `mongodb+srv://jalalahmednafiz:${process.env.DBPASS}@clusterx.ixectfw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// staying the same pool configuration because of the small projects with low traffic
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add connection pooling configurations
  maxPoolSize: 15, 
  minPoolSize: 5, 
  connectTimeoutMS: 30000
});

//connecting to the mongodb
const connect=async ()=>{
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}
//connecting the mongodb in the start of the server and using it to the whole server
connect();

// Export the connected client to other files
module.exports = client;
