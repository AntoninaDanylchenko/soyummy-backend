const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://antoninaivanets:b4W2nVwP3QZbl1bU@cluster0.hb9jpwm.mongodb.net/db_soyummy?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function searchRecipes(req, res) {
  const keyword = req.query.keyword;

  try {
    await client.connect();
    const collection = client.db("db_soyummy").collection("recipes");
    const result = await collection.find({ title: { $regex: keyword, $options: 'i' } }).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
}

module.exports = {
  searchRecipes
};