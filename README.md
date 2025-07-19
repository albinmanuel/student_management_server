# Student Management System – Backend

This is the backend repository for the MERN Stack-based Student Management System, built using Node.js, Express.js, and MongoDB. It handles user authentication, authorization, and all API endpoints for managing students and staff.

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- dotenv


## 🚀 Features

- **JWT Authentication** for Super Admin and Staff
- **Role-Based Access Control (RBAC)** with permission handling
- **Student Module**:
  - Create, View, Edit, Delete student records
- **Staff Module (Super Admin Only)**:
  - Create, View, Edit, Delete staff accounts
  - Assign CRUD permissions to staff for student management
- **Protected Routes** using middleware based on user roles and permissions

## 📦 How to Run


```bash
git clone <https://github.com/albinmanuel/student_management_server.gitl>
cd std_mng_server
npm install
nodemon index.js

