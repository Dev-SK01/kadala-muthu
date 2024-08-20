const express = require('express');
const mongoose = require('mongoose');
const app = express();
const groupDB = require('./groupSchema');
const msgDB = require('./messageSchema');
const cors = require('cors');
const Pusher = require("pusher");
require('dotenv').config();
const db = mongoose.connection;



// pusher config for realtime communication
const pusher = new Pusher({
    appId: "1852200",
    key: "e58366e9cc404c5fcd77",
    secret: "6da63c32be9b9c3f43d2",
    cluster: "ap2",
    useTLS: true
});

async function connectMongoDBAtlas() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("successfully connected to MongoDB!");
    } catch (err) {
        console.log(err.message);
    }
}

connectMongoDBAtlas();

// after the db connection
db.once("open", () => {
    console.log('DB connected');

    const groupCollection = db.collection('groups');
    const groupChangeStream = groupCollection.watch();
    // for group change pusher
    groupChangeStream.on("change", (changeDoc) => {
        //   console.log(changeDoc);
        if (changeDoc.operationType === "insert") {
            const groupDetails = changeDoc.fullDocument;
            pusher.trigger("groups", "inserted", groupDetails);
        } else {
            console.log('No Insert Event Triggered');
        }
    });

    const messageCollection = db.collection('messages');
    const messageChangeStream = messageCollection.watch();
    // for group change pusher

    messageChangeStream.on("change", (changeDoc) => {
        //   console.log(changeDoc);

        if (changeDoc.operationType === "insert") {
            const messageDetails = changeDoc.fullDocument;
            pusher.trigger("messages", "inserted", messageDetails);
        } else {
            console.log('No Insert Event Triggered');
        }
    })
});

//middlewares
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const data = await groupDB.find({});
    res.status(200).send(data);
});

// route for get the single group
app.get('/rooms/:id', async (req, res) => {
    try {
        const group = await groupDB.find({ _id: req.params.id });
        res.status(200).send(group[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// route for get all groups
app.get('/all/groups', async (req, res) => {
    try {
        const groups = await groupDB.find({});
        res.status(200).send(groups);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/messages/:id', async (req, res) => {
    try {
        const message = await msgDB.find({ groupId: req.params.id });
        res.status(200).send(message);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// route for post new message
app.post('/message/new', async (req, res) => {
    const message = req.body;
    if (message) {
        try {
            const msg = await msgDB.create(message);
            // console.log(msg);
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

