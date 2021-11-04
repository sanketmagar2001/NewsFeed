const express = require('express');
const app = express();
const mongoose = require('./Database/mongoose');
const Users = require('./Database/Models/users');
const Users_Collection = require('./Database/Models/User_Collection');


app.use(express.json());


//app.use allows us to use middleware

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
    (REST-API)
    User : create
    user_collection :   
        favourite : create,insert,delete,getfavourite
        subscribe channel : create,insert,delete,getSubscribeChannel
*/

//register user
app.post('/Register',(req,res)=>{
        (new Users({'Name':req.body.Name,'Password':req.body.Password}))
        .save()
        .then((user)=>res.send(user))
        .catch((error)=>console.log(error));

        (new Users_Collection({'Name':req.body.Name,'Favourites':[],'Subscribe_Channels':[]}))
        .save()
        .catch((error)=>console.log(error));
});


//login user
app.post('/Login',(req,res)=>{
    Users.find({'Name':req.body.Name,'Password':req.body.Password})
    .then((user)=>res.send(user))
    .catch((error)=>console.log(error));
});

app.get('/:name',(req,res)=>{
    Users_Collection.find({'Name':req.params.name})
    .then((fav) =>res.send(fav))
    .catch((error)=>console.log(error));
});

//add item to favourites
app.post('/:name',(req,res)=>{
    if(req.body.type == "fav")
    {
        Users_Collection.updateOne({Name:req.params.name},{$push : {Favourites:req.body.title}})
        .then((fav)=>res.send(fav))
        .catch((error)=>console.log(error));
    }else
    {
        Users_Collection.updateOne({Name:req.params.name},{$push : {Subscribe_Channels:req.body.title}})
        .then((fav)=>res.send(fav))
        .catch((error)=>console.log(error));
    }
   
});

app.listen(3000,() => console.log("server Connected !"));
