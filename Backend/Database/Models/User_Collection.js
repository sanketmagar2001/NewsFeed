const mongoose = require('mongoose');

const User_Collection_Schema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Favourites:{
        type:Array,
        items:{
            type:String
        }
    },
    Subscribe_Channels:{
        type:Array,
        items:{
            type:String
        }
    }
});

const User_Collection_ = mongoose.model('User_collection',User_Collection_Schema);

module.exports = User_Collection_;
