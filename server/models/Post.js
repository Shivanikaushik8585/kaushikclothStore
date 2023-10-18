const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true

    },
    image:{
        publicId:String,
        url:String
    },
    caption:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }],
    posts:[{
        type:mongoose.Schema.ObjectId,
        ref:'post'
    }]
})
module.exports = mongoose.model('post',postSchema);