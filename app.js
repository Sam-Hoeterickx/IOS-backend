const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

dotenv.config();
const database_URL = process.env.DATABASE_URL;
const client = new MongoClient(database_URL);

app.use(express.json());
app.use(cors());

const database = client.db('IOS-end-task');

app.get('/', (req, res) => {
    console.log("IOS Backend")
    res.send("IOS");
})

app.get('/api/sights', async (req, res) => {

    const collection = database.collection('sight');

    try{
        await client.connect();

        const sights = await collection.find().toArray();

        res.json(sights);

    } catch(error){
        console.error('An error occurd while fetching sights', error);
        res.status(500).send('An error occurd while fetching sights');
    }

});


app.listen(port, () => {
    console.log(`Example is listening on port:${port}`);
})