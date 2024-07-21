const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        name: String,
        message: String,
        timestamps:String,
        uid: String,
        groupId: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('messages' , messageSchema);