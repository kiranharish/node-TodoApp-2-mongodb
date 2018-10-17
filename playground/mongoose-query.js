const {mongoose} = require('../server/db/mongoose')

const {User} = require('../server/models/user')



// User.remove().then(()=>{
//     console.log('database is cleared');
// })

// const user = new User({
//     name:'kiran',
//     email:'kiran@mail.com'
// })


// user.save().then(()=>{
//     console.log("doc is saved to database")
// })

const id = "5bc37bc871ce5c0d7895e526" 

User.findById({_id:id}).then((doc=>{
    if(!doc)
      return console.log("User unavailable")
    console.log('User',doc);
})).catch((e)=> console.log(e))