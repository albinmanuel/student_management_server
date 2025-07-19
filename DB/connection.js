const mongoose=require('mongoose')

const connectionString=process.env.connectionstring

mongoose.connect(connectionString).then(res=>{
    console.log('Student Management App connected with mongoose')
}).catch(err=>{
    console.log("error",err)
})
