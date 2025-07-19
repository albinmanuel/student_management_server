const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['staff'],
    default: 'staff',
  },
  permissions: {
    createStudent: {
      type: Boolean,
      default: false,
    },
    viewStudent: {
      type: Boolean,
      default: true,
    },
    editStudent: {
      type: Boolean,
      default: false,
    },
    deleteStudent: {
      type: Boolean,
      default: false,
    },
  },
});

const staffs = mongoose.model('staffs', staffSchema);
module.exports = staffs;
