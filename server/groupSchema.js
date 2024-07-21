const mongoose = require('mongoose');

const groupSchema = mongoose.Schema(
    {
        name : String,
    },
    {
       timestamps : true,
    }
);

module.exports = mongoose.model("groups", groupSchema)