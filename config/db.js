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
  }
});

module.exports = client;

