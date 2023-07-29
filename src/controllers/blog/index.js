const Blog = require("../../models/blog");

// fetch all blogs
const getAllBlogs = async (req, res) => {
  try {
    const Blogs = await Blog.find();
    res.json({
      status: true,
      message: "All blogs fetched successfully",
      data: Blogs,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching blogs",
    });
  }
};

// Fetch all active blogs
const getAllActiveBlogs = async (req, res) => {
  try {
    const Blogs = await Blog.find({ status: true })
      .populate("department", "department_id department_name");

    // Extracting department_id and department_name for each blog
    const blogsWithDepartments = Blogs.map((blog) => {
      const { department } = blog;
      const department_id = department._id;
      const department_name = department.department_name;
      return {
        ...blog._doc,
        department_id,
        department_name,
      };
    });

    res.json({
      status: true,
      message: "All active blogs fetched successfully",
      data: blogsWithDepartments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching blogs",
    });
  }
};


const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({
      _id: id,
      $or: [{ status: false }, { deleted_at: null }],
    }).populate("department", "department_id department_name");
    
    if (!blog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Blog not found or already deleted",
      });
    }

    const { department } = blog;
    const department_id = department._id;
    const department_name = department.department_name;

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
    const { author, title, description, department_id, views, is_published, image } =
      req.body;

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
  const { title, description } = req.body;
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id, $or: [{ status: false }, { deleted_at: null }] },
      { title, description },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Blog not found or already deleted",
      });
    }
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
      { _id: id, status: false, deleted_at: null },
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
      { _id: id, status: false, deleted_at: null },
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
      hey : error,
      message: "An error occurred while searching for blogs",
    });
  }
};

module.exports = {
  getAllBlogs,
  getAllActiveBlogs,
  getBlogById,
  createBlog,
  editBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
  searchBlog
};
