const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Connection is failure!')
    }
    console.log('Connection is successful!')
    //data base created
    const db=client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text:'something@database',
    //     complete:false,
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert new todo to database!',err)
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));

    // })

    // db.collection('Users').insertOne({
    //     name:'kiran',
    //     age:'18',
    //     location:'India',
    // },(err,result)=>{
    //     if(err){
    //         return console.log('unable to insert new user to database',err)
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2))
    //     console.log(result.ops[0]._id.getTimestamp())

        
    // })

  db.collection('Todos').find()
    client.close()
})
