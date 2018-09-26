const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Connection is failure!')
    }
    console.log('Connection is successful!')
    //data base created
    const db=client.db('TodoApp');

    db.collection("Users").findOneAndDelete({
        _id: new ObjectID("5baa410524a4de28a4756ef9")
    },(err,res)=>{
        console.log(JSON.stringify(res,undefined,2));
    })

//   db.collection('Users').find({name:'krish'}).toArray().then((res)=>{
//       console.log(res);
//   })
    
})
