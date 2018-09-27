const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Connection is failure!')
    }
    console.log('Connection is successful!')
    //data base created
    const db=client.db('TodoApp');

    // updateing a docukent "field updation"
    // db.collection("Users").findOneAndUpdate(
    //     {_id: new ObjectID("5ba9a97f54930509acf9502e")},
    //     {$set:{age:18}},
    //     {returnOriginal:false}
    // ).then((res)=>{
    //     console.log(res)
    // })

    db.collection("Users").findOneAndUpdate(
        {_id: new ObjectID("5ba9a97f54930509acf9502e")},
        {$inc:{age:2}},
        {returnOriginal:false},
        (error,result)=>{
            console.log(result);
        }
    )
    
    
})
