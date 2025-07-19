const express=require('express')

const router=express.Router()

const userController=require('../Controllers/userController')
const studentController=require('../Controllers/studentController')
const staffController=require('../Controllers/staffController')
const staffStudentController=require('../Controllers/staffStudentController')
const jwtMiddleWare=require('../MiddleWares/jwtMiddleware')

router.post('/api/login',userController.loginAPI)

router.post('/api/addstaff',jwtMiddleWare,staffController.createStaffAPI)

router.get('/api/getallstaffs', jwtMiddleWare, staffController.getAllStaffsAPI);

router.put('/api/updatestaff/:id', jwtMiddleWare, staffController.updateStaffAPI);

router.delete('/api/deletestaff/:id', jwtMiddleWare, staffController.deleteStaffAPI);

router.put('/api/updatepermissions/:id', jwtMiddleWare, staffController.updatePermissionsAPI);

router.get('/api/getpermissions/:id', jwtMiddleWare, staffController.getPermissionsAPI);

router.post('/api/addstudent', jwtMiddleWare, studentController.createStudentAPI);

router.get('/api/getallstudents', jwtMiddleWare, studentController.getAllStudentsAPI);

router.put('/api/updatestudent/:id', jwtMiddleWare, studentController.updateStudentAPI);

router.delete('/api/deletestudent/:id', jwtMiddleWare, studentController.deleteStudentAPI);

router.post('/api/createstudentbystaff', jwtMiddleWare, staffStudentController.createStudentByStaffAPI);

router.get('/api/getallstudentsbystaff', jwtMiddleWare, staffStudentController.getAllStudentsByStaffAPI);

router.put('/api/updatestudentbystaff/:id', jwtMiddleWare, staffStudentController.updateStudentByStaffAPI);

router.delete('/api/deletestudentbystaff/:id', jwtMiddleWare, staffStudentController.deleteStudentByStaffAPI);

router.get('/api/getparticularuser',jwtMiddleWare,userController.getParticularUserAPI)

router.get('/api/getcounts',jwtMiddleWare,userController.getCountsAPI)

module.exports = router