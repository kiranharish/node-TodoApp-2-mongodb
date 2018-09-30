const mongoose = require('mongoose');

var Todo = mongoose.model('todo',{
    text:{type:String},
    completed:{type:Boolean},
    completedAt:{type:Number}
});

module.exports = {Todo}