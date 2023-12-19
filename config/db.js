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
(async()=>{
    await client.connect((err) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
        console.log('Successfully connected to MongoDB!');
    });
})();

// Export the connected client to other files
module.exports = client;