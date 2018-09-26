const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Connection is failure!')
    }
    console.log('Connection is successful!')
    //data base created
    const db=client.db('TodoApp');

   
    db.collection('Users').find({

        // _id:new ObjectID("5baa410524a4de28a4756ef9"),
        name:'krish',name:'kiran'

    }).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2))
    },(err)=>{
        console.log("unable to find the query!")
    })


    client.close()
})
