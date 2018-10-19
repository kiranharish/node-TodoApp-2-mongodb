const {mongoose} = require('../server/db/mongoose')

const {Todo} = require('../server/models/todo')


Todo.remove({_id:"5bca259b7632eee6d789967e"}).then((docs)=>{
    console.log(docs)
})