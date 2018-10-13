const express = require('express');
const bodyParser=require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require ('./models/todo');
const {User} = require('./models/user')

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

app.listen(3000,()=>{
    console.log('Server on port 3000!');
})


module.exports={app}