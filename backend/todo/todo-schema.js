 const mongoose = require('mongoose');
const userModel = require('../auth/user-model');

const TodoSchema = mongoose.Schema({
    description: String,
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"  
    }
},
{
    timestamps:true,
    toJSON:{virtual:true}
});

TodoSchema.virtual('authorName').get(async function() {
    try {
        console.log("hiii");
      const author = await this.populate('owner').execPopulate(); // Eager loading
      return author ? author.name : 'Unknown Author';
    } catch (error) {
      console.error('Error fetching author:', error);
      return 'Author Unavailable'; // Handle errors gracefully
    }
  });


module.exports = mongoose.model("Todo", TodoSchema);