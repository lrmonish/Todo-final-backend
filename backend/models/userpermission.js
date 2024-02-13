const mongoose = require('mongoose');


const userPermissionSchema = mongoose.Schema({
    name:
    {
        type: String,
        default: "USER"
    },
    update:{
        type: Boolean,
        default: false
    },
    create:{
        type: Boolean,
        default: false
    },
    delete:{
        type: Boolean,
        default: false
    },
    completed:{
        type: Boolean,
        default: false
    },
    
},
{
    timestamps:true
});

module.exports = mongoose.model("userPermission", userPermissionSchema);


