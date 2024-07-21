const express = require('express');
const mongoose = require('mongoose');
const app = express();
const groupDB = require('./groupSchema');
const msgDB = require('./messageSchema');
const cors = require('cors');
require('dotenv').config();


async function connectMongoDBAtlas() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("successfully connected to MongoDB!");
    } catch (err) {
        console.log(err.message);
    }
}

connectMongoDBAtlas();

//middlewares
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const data = await groupDB.find({});
    res.status(200).send(data);
});

app.post('/message/new', async (req, res) => {
    const message = req.body;
    if (message) {
        try {
            const msg = await msgDB.create(message);
            console.log(msg);
            res.status(201).send(msg);
        } catch (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    }

})

app.post('/group/create', async (req, res) => {
    const groupName = req.body.groupName;
    try {
        const data = await groupDB.create({ name: groupName });
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(2500, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server Running at 2500')
    }
});

