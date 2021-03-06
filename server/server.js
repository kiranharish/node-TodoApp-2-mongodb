require('./config/config.js')

const express = require('express');
const bodyParser=require('body-parser');
const {ObjectId} = require('mongoose').Types;
const _= require("lodash")

const {mongoose} = require('./db/mongoose');
const {Todo} = require ('./models/todo');
const {User} = require('./models/user')

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    // console.log(req.body);

    var todo1 = new Todo({
        text:req.body.text,
        completed:req.body.completed
    })

    todo1.save()
    .then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
})


//Get todos /GET
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.status(200).send({todos});
        
    },(err)=>{
        res.status(400).send(err);
    })
})


app.get('/todos/:id',(req,res)=>{
    var id= req.params.id;

    if(!ObjectId.isValid(id))
        return res.status(404).send("invalid Id") 


    Todo.findById(id).then((todo)=>{

        if(!todo)
             return res.status(404).send();

        res.send({todo})
    },(e)=>{res.status(400).send(e)})
    
})


app.delete('/todos/:id',(req,res)=>{
    var id= req.params.id

    if(!ObjectId.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo)
            return res.status(404).send()

        res.status(200).send({todo});
    }).catch((e)=>res.status(400).send(e))
})


app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id
    var body = _.pick(req.body,["text","completed"])
    // console.log(body.completed);

    if(!ObjectId.isValid(id)) return res.status(404).send();
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }
    
        Todo.findOneAndUpdate(
            {_id:req.params.id},
            {$set:body},
            {new:true},
            ).then((todo)=>{
                if(todo) res.status(200).send({todo})
                else res.status(404).send()
            }).catch((e)=> res.status(400).send(e))
    
     
})


app.listen(port,()=>{
    console.log(`Starting port on ${port}`);
})


module.exports={app}