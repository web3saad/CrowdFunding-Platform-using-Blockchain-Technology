const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://mahammadsayad777:sBwTqEdJaAoKVSc8@clusteretherfund.2hmkh.mongodb.net/EtherFund?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
  } catch (e) {
    console.error("❗ Error connecting to MongoDB:", e);
  } finally {
    await client.close();
  }
}
run();
