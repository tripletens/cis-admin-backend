const Department = require("../../models/department");

// Fetch all active departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ status: true });
    res.json({
      status: true,
      message: "All active departments fetched successfully",
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching departments",
    });
  }
};

// Fetch a department by ID
const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({
        status: false,
        data:null,
        message: "Department not found",
      });
    }
    res.json({
      status: true,
      message: "Department has been fetched successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while fetching the department",
    });
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create new department
    const newDepartment = new Department({
      name,
      description,
      status: true,
    });

    // Save the department to the database
    const savedDepartment = await newDepartment.save();

    res.status(201).json({
      status: true,
      message: "Department created successfully",
      data: savedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred during department creation",
    });
  }
};

// Edit a department
const editDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const department = await Department.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!department) {
      return res.status(404).json({
        status:false,
        data:null,
        message: "Department not found",
      });
    }
    res.json({
      status: true,
      data: department,
      message: "Department has been updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while updating the department",
    });
  }
};

// Delete a department (change status to false)
const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    if (!department) {
      return res.status(404).json({
        status: false,
        data:null,
        message: "Department not found",
      });
    }
    res.json({
      status: true,
      data: null,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while deleting the department",
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  editDepartment,
  deleteDepartment,
};
