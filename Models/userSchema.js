const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['staff', 'superadmin'],
        default: 'staff',
        required:true
    }
})

const users=mongoose.model('users',userSchema)
module.exports=users