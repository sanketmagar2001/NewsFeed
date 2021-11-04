const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    Name:{
        type:String,
        trim:true,
        minlength:5
    },
    Password:{
        type:String,
        minlength:8
    }
});

const Users = mongoose.model('Users',UsersSchema);

module.exports = Users;
