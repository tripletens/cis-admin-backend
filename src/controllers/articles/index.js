const Articles = require("../../models/articles");

// fetch all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.find();
    // Sort the articles by most recent (based on createdAt field)
    // Articles.sort((a, b) => b.createdAt - a.createdAt);
    
    res.json({
      status: true,
      message: "All Articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching articles",
    });
  }
};

// Fetch all active articles
const getAllActiveArticles = async (req, res) => {
  try {
    const articles = await Articles.find({ status: true });

    // Sort the articles by most recent (based on createdAt field)
    articles.sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      status: true,
      message: "All active articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching articles => " + error,
    });
  }
};


// get the top most recent articles i.e 10 
const getMostRecentArticles = async (req, res) => {
  try {
    let limit = req.query.limit || 10; // Default limit is 10, but can be overridden with a query parameter
    
    // Parse the limit parameter as an integer
    limit = parseInt(limit, 10);

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Invalid limit parameter. Limit must be a positive integer.",
      });
    }

    // Fetch the specified number of most recent articles from the database
    const articles = await Articles.find().sort({ createdAt: -1 }).limit(limit);

    res.json({
      status: true,
      message: `${limit} Most Recent Articles fetched successfully`,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching articles",
    });
  }
};

// fetch all the unpublished articles
// const getAllUnpublishedArticles = async (req, res) => {
//   try {
//     const Blogs = await Blog.find({
//       status: true,
//       is_published: false,
//     }).populate("department_id");

//     // Extracting department_id and department_name for each blog
//     const blogsWithDepartments = Blogs.map((blog) => {
//       const department = blog.department_id; // Retrieve the populated department

//       // Check if the department is defined and not null before accessing its properties
//       const department_id = department ? department._id : null;
//       const department_name = department ? department.name : null;

//       return {
//         ...blog._doc,
//         department_id,
//         department_name,
//       };
//     });

//     res.json({
//       status: true,
//       message: "All unpublished blogs fetched successfully",
//       data: blogsWithDepartments,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       data: null,
//       message: "An error occurred while fetching blogs => " + error,
//     });
//   }
// };

// fetch articles by id 
// const getArticlesById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const blog = await Blog.findOne({
//       _id: id,
//       $or: [{ status: false }, { deleted_at: null }],
//     }).populate("department_id", "department_id department_name"); // Populate the department_id field

//     if (!blog) {
//       return res.status(404).json({
//         status: false,
//         data: null,
//         message: "Blog not found or already deleted",
//       });
//     }

//     const { department_id, department_name } = blog.department_id; // Extract department data

//     res.json({
//       status: true,
//       message: "Blog has been fetched successfully",
//       data: {
//         blog,
//         department_id,
//         department_name,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       data: null,
//       message: "An error occurred while fetching the blog",
//     });
//   }
// };

// Create a new article
const createArticle = async (req, res) => {
  try {
    const {
      author,
      title,
      description,
      views,
      is_published,
      image,
    } = req.body;

    // Create new article
    const newArticle = new Articles({
      author,
      title,
      description,
      views,
      is_published,
      image,
      status: true,
      deleted_at: null,
    });

    // Save the article to the database
    const savedArticles = await newArticle.save();

    res.status(201).json({
      status: true,
      message: "Articles created successfully",
      data: savedArticles,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred during articles creation",
    });
  }
};

// Edit a articles
const editArticle = async (req, res) => {
  const { id } = req.params;
  const { author, title, description, views, is_published, image } =
    req.body;

  try {
    const articleUpdates = {};

    // Only update the fields that were provided in the request body
    if (author) articleUpdates.author = author;
    if (title) articleUpdates.title = title;
    if (description) articleUpdates.description = description;
    if (views !== undefined) articleUpdates.views = views;
    if (is_published !== undefined) articleUpdates.is_published = is_published;
    if (image !== undefined) articleUpdates.image = image;

    const articles = await Articles.findOneAndUpdate(
      {
        _id: id,
        status: true, // Check if the blog is active (status: true)
        deleted_at: null, // Check if the blog is not deleted (deleted_at: null)
      },
      articleUpdates,
      { new: true }
    );

    if (!articles) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Articles not found or already deleted",
      });
    }

    // No need to manually extract department_id and department_name
    // as they are not part of the BlogSchema and will be populated
    // when fetching the blog using .findOneAndUpdate

    res.json({
      status: true,
      data: articles,
      message: "Articles has been updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while updating the Articles",
    });
  }
};


// unpublish article
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

// publish article
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

// search article 
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
  getAllArticles,
  getAllActiveArticles,
  getMostRecentArticles,
  createArticle,
  editArticle,
  deleteBlog,
  publishBlog,
  unpublishBlog,
  searchBlog,
};
