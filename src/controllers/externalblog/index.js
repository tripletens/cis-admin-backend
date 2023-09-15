const ExternalBlog = require("../../models/externalblog");

const getallExternalBlog = async (req, res) => {
  try {

    const externalblogs = await ExternalBlog.find({status : true}).limit(10);

  } catch (error) {
    // Handle errors and respond with an error JSON response
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching external blogs: " + error.message,
    });
  }
}

// fetch external blog by id 
const getExternalBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const externalblog = await ExternalBlog.findOne({
      _id: id,
      $or: [{ status: false }, { deleted_at: null }],
    });

    if (!externalblog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "External Blog not found or already deleted",
      });
    }

    res.json({
      status: true,
      message: "External Blog has been fetched successfully",
      data: {
        ...externalblog._doc
      },
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching the external blog",
    });
  }
};

// Create a new External Blog
const createExternalBlog = async (req, res) => {
  try {
    const {
      link_url, image_url, is_published
    } = req.body;

    // Create new external blog
    const newExternalBlog = new ExternalBlog({
      link_url, image_url, is_published,
      status: true,
      deleted_at: null,
    });

    // Save the external Blog to the database
    const savedExternalBlog = await newExternalBlog.save();

    res.status(201).json({
      status: true,
      message: "External Blog created successfully",
      data: savedExternalBlog,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred during external blogs creation",
    });
  }
};

// Edit an external Blog
const editExternalBlog = async (req, res) => {
  const { id } = req.params;
  const { link_url, image_url, is_published } =
    req.body;

  try {
    const externalBlogUpdates = {};

    // Only update the fields that were provided in the request body
    if (link_url !== undefined) externalBlogUpdates.link_url = link_url;
    if (image_url !== undefined) externalBlogUpdates.image_url = image_url;
    if (is_published !== undefined) externalBlogUpdates.is_published = is_published;

    const externalBlogs = await ExternalBlog.findOneAndUpdate(
      {
        _id: id,
        status: true, // Check if the external blog is active (status: true)
        deleted_at: null, // Check if the blog is not deleted (deleted_at: null)
      },
      externalBlogUpdates,
      { new: true }
    );

    if (!externalBlogs) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "External Blogs not found or already deleted",
      });
    }

    // No need to manually extract department_id and department_name
    // as they are not part of the BlogSchema and will be populated
    // when fetching the blog using .findOneAndUpdate

    res.json({
      status: true,
      data: externalBlogs,
      message: "External Blog has been updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while updating the External Blog",
    });
  }
};


// Delete an External Blog (change status to false)
const deleteExternalBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const currentTime = new Date();
    const externalBlog = await ExternalBlog.findByIdAndUpdate(
      id,
      { status: false, deleted_at: currentTime },
      { new: true }
    );

    if (!externalBlog) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "External Blog not found",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "External Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while deleting the External Blog",
    });
  }
};

// search external blog 
const searchExternalBlog = async (req, res) => {

  const query = req.query.q; // Get the search query from the query parameter

  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({
        status: false,
        message: "Invalid or empty search query.",
      });
    }

    const externalBlog = await ExternalBlog.find({
      $text: { $search: query },
      $or: [{ status: true }, { deleted_at: null }],
    }).sort({createdAt: -1});

    res.json({
      status: true,
      message: "External Blog searched successfully",
      data: externalBlog,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while searching for External Blog",
      error: error.message, // Include the error message for debugging
    });
  }
};


module.exports = {
  getallExternalBlog,
  getExternalBlogById,
  searchExternalBlog,
  deleteExternalBlog,
  editExternalBlog, 
  createExternalBlog,
};
