const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
   
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true,
    },
    emotion:{
        type:String,
        required: true,
    },

}, {
    timestamps:true
})

module.exports = mongoose.model('notes' , noteSchema)