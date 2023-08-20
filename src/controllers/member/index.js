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

// Fetch all active blogs
const getAllActiveBlogs = async (req, res) => {
  try {
    const Blogs = await Blog.find({ status: true }).populate("department_id");

    // Extracting department_id and department_name for each blog
    const blogsWithDepartments = Blogs.map((blog) => {
      const department = blog.department_id; // Retrieve the populated department

      // Check if the department is defined and not null before accessing its properties
      const department_id = department ? department._id : null;
      const department_name = department ? department.name : null;

      return {
        ...blog._doc,
        department_id,
        department_name,
      };
    });

    // Sort the blogs by most recent (based on createdAt field)
    blogsWithDepartments.sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      status: true,
      message: "All active blogs fetched successfully",
      data: blogsWithDepartments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching blogs => " + error,
    });
  }
};

// fetch all the unpublished blogs
const getAllUnpublishedBlogs = async (req, res) => {
  try {
    const Blogs = await Blog.find({
      status: true,
      is_published: false,
    }).populate("department_id");

    // Extracting department_id and department_name for each blog
    const blogsWithDepartments = Blogs.map((blog) => {
      const department = blog.department_id; // Retrieve the populated department

      // Check if the department is defined and not null before accessing its properties
      const department_id = department ? department._id : null;
      const department_name = department ? department.name : null;

      return {
        ...blog._doc,
        department_id,
        department_name,
      };
    });

    res.json({
      status: true,
      message: "All unpublished blogs fetched successfully",
      data: blogsWithDepartments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching blogs => " + error,
    });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({
      _id: id,
      $or: [{ status: false }, { deleted_at: null }],
    }).populate("department_id", "department_id department_name"); // Populate the department_id field

    if (!blog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Blog not found or already deleted",
      });
    }

    const { department_id, department_name } = blog.department_id; // Extract department data

    res.json({
      status: true,
      message: "Blog has been fetched successfully",
      data: {
        blog,
        department_id,
        department_name,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching the blog",
    });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const {
      author,
      title,
      description,
      department_id,
      views,
      is_published,
      image,
    } = req.body;

    // Create new blog
    const newBlog = new Blog({
      author,
      title,
      description,
      department_id,
      views,
      is_published,
      image,
      status: true,
      deleted_at: null,
    });

    // Save the blog to the database
    const savedBlog = await newBlog.save();

    res.status(201).json({
      status: true,
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred during blog creation",
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

const unpublishBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const unpublishBlog = await Blog.findByIdAndUpdate(
      { _id: id, status: true, deleted_at: null },
      { is_published: false },
      { new: true }
    );

    // return unpublishBlog;

    if (!unpublishBlog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No blog with that ID exists.",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "Blog unpublished successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: null,
      //   message: err
      message: "An error occurred while unpublishing the Blog",
    });
  }
};

const publishBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id, status: true, deleted_at: null },
      { is_published: true },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No unpublished blog with that ID exists.",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "Blog published successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while publishing the Blog",
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
  getAllActiveBlogs,
  getBlogById,
  createBlog,
  editBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
  searchBlog,
  getAllUnpublishedBlogs,
};
