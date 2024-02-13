const mongoose = require('mongoose');


const adminPermissionSchema = mongoose.Schema({
    name:
    {
        type: String,
        default: "ADMIN"
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

module.exports = mongoose.model("adminPermission", adminPermissionSchema);


