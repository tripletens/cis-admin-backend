const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department/index');

// Define routes

// GET /departments - Fetch all departments
router.get('/departments', DepartmentController.getAllDepartments);

// GET /departments/:id - Fetch a department by ID
router.get('/departments/:id', DepartmentController.getDepartmentById);

// POST /departments - Create a new department
router.post('/departments', DepartmentController.createDepartment);

// PUT /departments/:id - Edit a department
router.put('/departments/:id', DepartmentController.editDepartment);

// DELETE /departments/:id - Delete a department
router.delete('/departments/:id', DepartmentController.deleteDepartment);

module.exports = router;
