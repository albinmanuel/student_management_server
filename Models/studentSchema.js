const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  }
});

const students = mongoose.model('students', studentSchema);
module.exports = students;
