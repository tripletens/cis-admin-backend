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
    const articles = await Articles.find({status : true, is_published: true}).sort({ createdAt: -1 }).limit(limit);

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
const getAllUnpublishedArticles = async (req, res) => {
  try {
    const articles = await Articles.find({
      status: true,
      is_published: false,
    });

    res.json({
      status: true,
      message: "All unpublished articles fetched successfully",
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

// fetch all the published articles
const getAllpublishedArticles = async (req, res) => {
  try {
    const articles = await Articles.find({
      status: true,
      is_published: true,
    });

    res.json({
      status: true,
      message: "All published articles fetched successfully",
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


// fetch articles by id 
const getArticlesById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Articles.findOne({
      _id: id,
      $or: [{ status: false }, { deleted_at: null }],
    });

    if (!article) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Articles not found or already deleted",
      });
    }

    res.json({
      status: true,
      message: "Articles has been fetched successfully",
      data: {
        article
      },
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching the articles",
    });
  }
};

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
        status: true, // Check if the articles is active (status: true)
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
const unpublishArticles = async (req, res) => {
  const { id } = req.params;

  try {
    const unpublishArticles = await Articles.findByIdAndUpdate(
      { _id: id, status: true, deleted_at: null },
      { is_published: false },
      { new: true }
    );

    // return unpublishArticles;

    if (!unpublishArticles) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No Articles with that ID exists.",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "Articles unpublished successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: null,
      //   message: err
      message: "An error occurred while unpublishing the Articles",
    });
  }
};

// publish article
const publishArticles = async (req, res) => {
  const { id } = req.params;

  try {
    const articles = await Articles.findOneAndUpdate(
      { _id: id, status: true, deleted_at: null },
      { is_published: true },
      { new: true }
    );

    if (!articles) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No unpublished Articles with that ID exists.",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "Articles published successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while publishing the Articles",
    });
  }
};

// Delete a Articles (change status to false)
const deleteArticles = async (req, res) => {
  const { id } = req.params;
  try {
    const currentTime = new Date();
    const articles = await Articles.findByIdAndUpdate(
      id,
      { status: false, deleted_at: currentTime },
      { new: true }
    );

    if (!articles) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Articles not found",
      });
    }

    res.json({
      status: true,
      data: null,
      message: "Articles deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while deleting the Articles",
    });
  }
};

// search article 
const searchArticles = async (req, res) => {
  const { query } = req.body;
  try {
    const Articless = await Articles.find({
      $text: { $search: query },
      $or: [{ status: false }, { deleted_at: null }],
    });
    res.json({
      status: true,
      message: "Articless searched successfully",
      data: Articless,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      hey: error,
      message: "An error occurred while searching for Articless",
    });
  }
};

module.exports = {
  getAllArticles,
  getAllActiveArticles,
  getMostRecentArticles,
  getAllUnpublishedArticles,
  getAllpublishedArticles,
  createArticle,
  editArticle,
  deleteArticles,
  publishArticles,
  unpublishArticles,
  searchArticles,
  getArticlesById
};
