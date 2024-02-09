const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    description: String,
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"  
    },
    ownerName:{
        type:String
        
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Todo", todoSchema);