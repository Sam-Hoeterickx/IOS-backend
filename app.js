const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

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

app.get('/api/sights/:id', async (req, res) => {

    const collection = database.collection('sight');

    try{
        await client.connect();

        const sight_ID = req.params.id;
        const object_ID = new ObjectId(sight_ID);

        console.log(sight_ID, object_ID);

        const sight = await collection.findOne({
            _id : object_ID
        })

        if(sight){
            res.send(sight);
        } else{
            res.status(404).send("Sight not found");
        }

    }catch(error){
        console.log('An error occurd while fetching sight with id', error);
        res.status(500).send('An error occurd while fetching sight with id');
    }
})


app.listen(port, () => {
    console.log(`Example is listening on port:${port}`);
})