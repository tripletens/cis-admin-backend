const Member = require("../../models/members");

// fetch all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .populate("departmentId", "name") // Populate department and select only 'name' field
      .sort({ createdAt: -1 });

    const membersWithDepartmentName = members.map((member) => ({
      _id: member._id,
      name: member.name,
      department: member.departmentId.name, // Include department name
      office: member.office,
      linkedin: member.linkedin,
      facebook: member.facebook,
      twitter: member.twitter,
      createdAt: member.createdAt,
    }));

    res.json({
      status: true,
      message: "All members fetched successfully",
      data: membersWithDepartmentName,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching members",
    });
  }
};

// Fetch all active members
const getAllActiveMembers = async (req, res) => {
  try {
    const members = await Member.find({ status: true }).populate("departmentId", "name");

    const membersWithDepartments = members.map((member) => {
      const department = member.departmentId; // Retrieve the populated department

      // Check if the department is defined and not null before accessing its properties
      const department_id = department ? department._id : null;
      const department_name = department ? department.name : null;

      return {
        ...member.toObject(), // Convert the member document to a plain object
        department_id,
        department_name,
      };
    });

    // Sort the members by most recent (based on createdAt field)
    membersWithDepartments.sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      status: true,
      message: "All active members fetched successfully",
      data: membersWithDepartments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching active members => " + error,
    });
  }
};


const getMemberById = async (req, res) => {
  const memberId = req.params.id; // Get the member ID from the request parameters

  try {
    const member = await Member.findById(memberId).populate("departmentId", "name");

    if (!member) {
      return res.status(404).json({
        status: false,
        message: "Member not found",
        data: null,
      });
    }

    const department = member.departmentId;
    const department_id = department ? department._id : null;
    const department_name = department ? department.name : null;

    const memberWithDepartment = {
      ...member.toObject(),
      department_id,
      department_name,
    };

    res.json({
      status: true,
      message: "Member fetched successfully",
      data: memberWithDepartment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching the member => " + error,
    });
  }
};


// Create a new member
const createMember = async (req, res) => {
  const { name, departmentId, office, linkedin, facebook, twitter } = req.body;

  try {
    const newMember = new Member({
      name,
      departmentId,
      office,
      linkedin,
      facebook,
      twitter,
    });

    const savedMember = await newMember.save();

    res.status(201).json({
      status: true,
      message: "Member created successfully",
      data: savedMember,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while creating the member => " + error,
    });
  }
};


// Edit a blog
const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, department_id, views, is_published, image } =
    req.body;

  try {
    const blogUpdates = {};

    // Only update the fields that were provided in the request body
    if (title) blogUpdates.title = title;
    if (description) blogUpdates.description = description;
    if (department_id) blogUpdates.department_id = department_id; // Update department_id
    if (views !== undefined) blogUpdates.views = views;
    if (is_published !== undefined) blogUpdates.is_published = is_published;
    if (image !== undefined) blogUpdates.image = image;

    const blog = await Blog.findOneAndUpdate(
      {
        _id: id,
        status: true, // Check if the blog is active (status: true)
        deleted_at: null, // Check if the blog is not deleted (deleted_at: null)
      },
      blogUpdates,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Blog not found or already deleted",
      });
    }

    // No need to manually extract department_id and department_name
    // as they are not part of the BlogSchema and will be populated
    // when fetching the blog using .findOneAndUpdate

    res.json({
      status: true,
      data: blog,
      message: "Blog has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while updating the Blog",
    });
  }
};

// Delete a Blog (change status to false)
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const currentTime = new Date();
    const blog = await Blog.findByIdAndUpdate(
      id,
      { status: false, deleted_at: currentTime },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Blog not found",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while deleting the Blog",
    });
  }
};

const searchBlog = async (req, res) => {
  const { query } = req.body;
  try {
    const blogs = await Blog.find({
      $text: { $search: query },
      $or: [{ status: false }, { deleted_at: null }],
    });
    res.json({
      status: true,
      message: "Blogs searched successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      hey: error,
      message: "An error occurred while searching for blogs",
    });
  }
};

module.exports = {
  getAllMembers,
  getAllActiveMembers,
  getMemberById,
  createMember,
};