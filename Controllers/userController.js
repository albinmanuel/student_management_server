const mongoose=require('mongoose')
const users=require('../Models/userSchema')
const staffs=require('../Models/staffSchema')
const students=require('../Models/studentSchema')
const jwt=require('jsonwebtoken')


exports.loginAPI=async(req,res)=>{
    console.log('Inside login')
    const{email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.jwtkey)
            console.log(token)
            res.status(200).json({currentUser:existingUser,token})
        }
        else{
            res.status(404).json("Incorrect email or password")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getParticularUserAPI = async (req, res) => {
  const userId = req.payload;

  console.log("Inside the user Projects");
  try {
    const user = await users.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found", details: err });
  }
};

exports.getCountsAPI = async (req, res) => {
    console.log('Inside getCounts');
    try {
        const staffCount = await staffs.countDocuments();
        const studentCount = await students.countDocuments();
        res.status(200).json({
            staffCount,
            studentCount,
            totalCount: staffCount + studentCount
        });
        
    } catch (err) {
        console.error('Error getting counts:', err);
        res.status(500).json({ 
            error: "Failed to get counts", 
            details: err.message 
        });
    }
};
