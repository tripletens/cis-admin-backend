

import Blog from "../../models/blog";

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
      const Blogs = await Blog.find({ status: true });
      res.json({
        status: true,
        message: "All active blogs fetched successfully",
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
  

const getBlogById = async (req, res) => {
    // TODO implement this method to fetch a blog by id using its ID as parameter in the URL
    const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: false,
        data:null,
        message: "Blog not found",
      });
    }
    res.json({
      status: true,
      message: "Blog has been fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while fetching the blog",
    });
  }
}

// Create a new blog
const createBlog = async (req, res) => {
    try {
      const { author, title, Blog_id, views, is_published, image } = req.body;
  
      // Create new blog
      const newBlog = new Blog({
        author, title, Blog_id, views, is_published, image,
        status: true,
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
        data:null,
        message: "An error occurred during blog creation",
      });
    }
  };
  
  // Edit a blog
  const editBlog = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const Blog = await Blog.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      if (!Blog) {
        return res.status(404).json({
          status:false,
          data:null,
          message: "Blog not found",
        });
      }
      res.json({
        status: true,
        data: Blog,
        message: "Blog has been updated successfully"
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        data:null,
        message: "An error occurred while updating the Blog",
      });
    }
  };
  
  // Delete a Blog (change status to false)
  const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const Blog = await Blog.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );

      if (!Blog) {
        return res.status(404).json({
          status: false,
          data:null,
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
        data:null,
        message: "An error occurred while deleting the Blog",
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
  };
  