const mongoose = require('mongoose');

var User = mongoose.model('user',{
    name:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        trim:true,
        minlength:1
    },
})


module.exports = {User}