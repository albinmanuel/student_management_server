const mongoose = require('mongoose');
const students = require('../Models/studentSchema');

exports.createStudentAPI = async (req, res) => {
  const { name, age, grade, contactNo } = req.body;

  try {
    const newStudent = new students({ name, age, grade, contactNo });
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err });
  }
}

exports.getAllStudentsAPI = async (req, res) => {
  try {
    const allStudents = await students.find();
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err });
  }
}

exports.updateStudentAPI = async (req, res) => {
  const { id } = req.params;
  const { name, age, grade, contactNo } = req.body;

  try {
    const updatedStudent = await students.findByIdAndUpdate(
      id,
      { name, age, grade, contactNo },
      { new: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating student', error: err });
  }
}

exports.deleteStudentAPI = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await students.findByIdAndDelete(id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err });
  }
}
