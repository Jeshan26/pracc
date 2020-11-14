//add mongoose
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    required: true
  }
}
)

// make this public

module.exports = mongoose.model('Task',taskSchema);

//The first argument is the singular name of the collection that will be created for your model (Mongoose will create the database collection for the above model SomeModel above), and the second argument is the schema you want to use in creating the model.