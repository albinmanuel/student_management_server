const mongoose = require('mongoose');
const staffs = require('../Models/staffSchema');
const users = require('../Models/userSchema');

exports.createStaffAPI = async (req, res) => {
  const { name, email, phoneno, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newStaff = new staffs({ name, email, phoneno, password });
    await newStaff.save();

    const newUser = new users({
        _id: newStaff._id,
      name,
      email,
      phoneno,
      password,
      role: 'staff',
    });
    await newUser.save();

    res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
  } catch (err) {
    res.status(500).json({ message: 'Error creating staff', error: err });
  }
};

exports.getAllStaffsAPI = async (req, res) => {
  try {
    const allStaffs = await staffs.find();
    res.status(200).json(allStaffs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching staffs', error: err });
  }
};


exports.updateStaffAPI = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneno, password } = req.body;

  try {
    const staff = await staffs.findByIdAndUpdate(
      id,
      { name, email, phoneno, password },
      { new: true }
    );

    const user = await users.findOneAndUpdate(
      { email },
      { name, phoneno, password },
      { new: true }
    );

    if (!staff || !user) return res.status(404).json({ message: 'Staff not found' });

    res.status(200).json({ message: 'Staff updated successfully', staff });
  } catch (err) {
    res.status(500).json({ message: 'Error updating staff', error: err });
  }
};

exports.deleteStaffAPI = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await staffs.findByIdAndDelete(id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    await users.findOneAndDelete({ email: staff.email });

    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting staff', error: err });
  }
};


exports.updatePermissionsAPI = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  try {
    const updatedStaff = await staffs.findByIdAndUpdate(
      id,
      { permissions },
      { new: true }
    );
    if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' });

    res.status(200).json({ message: 'Permissions updated', permissions: updatedStaff.permissions });
  } catch (err) {
    res.status(500).json({ message: 'Error updating permissions', error: err });
  }
};

exports.getPermissionsAPI = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await staffs.findById(id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    res.status(200).json(staff.permissions);
  } catch (err) {
    res.status(500).json({ message: 'Error getting permissions', error: err });
  }
};
