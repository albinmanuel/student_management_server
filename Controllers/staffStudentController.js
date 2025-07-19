const mongoose = require('mongoose');
const staffs = require('../Models/staffSchema');
const students = require('../Models/studentSchema');

const hasPermission = async (staffId, permissionKey) => {
  try {
    console.log('Checking permission for staffId:', staffId, 'permissionKey:', permissionKey);
    
    const staff = await staffs.findById(staffId);
    console.log('Staff found:', staff ? 'Yes' : 'No');
    
    if (!staff) {
      console.log('Staff not found');
      return false;
    }
    
    console.log('Staff permissions:', staff.permissions);
    console.log('Permission value:', staff.permissions[permissionKey]);
    
    return staff.permissions[permissionKey] === true;
  } catch (error) {
    console.error('Error in hasPermission:', error);
    return false;
  }
};

exports.createStudentByStaffAPI = async (req, res) => {
  console.log('Create student - req.payload:', req.payload);
  const allowed = await hasPermission(req.payload, 'createStudent');
  if (!allowed) return res.status(403).json({ message: 'Permission denied to create student' });

  const { name, age, grade, contactNo } = req.body;
  try {
    const newStudent = new students({ name, age, grade, contactNo });
    await newStudent.save();
    res.status(201).json({ message: 'Student created', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};

exports.getAllStudentsByStaffAPI = async (req, res) => {
  console.log('Get all students - req.payload:', req.payload);
  const allowed = await hasPermission(req.payload, 'viewStudent');
  if (!allowed) return res.status(403).json({ message: 'Permission denied to view students' });

  try {
    const allStudents = await students.find();
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};

exports.updateStudentByStaffAPI = async (req, res) => {
  console.log('Update student - req.payload:', req.payload);
  const allowed = await hasPermission(req.payload, 'editStudent');
  if (!allowed) return res.status(403).json({ message: 'Permission denied to edit student' });

  const { id } = req.params;
  const { name, age, grade, contactNo } = req.body;

  try {
    const updated = await students.findByIdAndUpdate(
      id, 
      { name, age, grade, contactNo }, 
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student updated', student: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
};

exports.deleteStudentByStaffAPI = async (req, res) => {
  console.log('Delete student - req.payload:', req.payload);
  const allowed = await hasPermission(req.payload, 'deleteStudent');
  if (!allowed) return res.status(403).json({ message: 'Permission denied to delete student' });

  const { id } = req.params;

  try {
    const deleted = await students.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};