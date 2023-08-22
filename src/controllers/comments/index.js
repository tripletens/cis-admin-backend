const Comments = require("../../models/comments");

// Fetch all active comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.find({ status: true });

    res.json({
      status: true,
      message: "All active comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching comments",
    });
  }
};

// Fetch a comments by ID
const getCommentsById = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comments.findById(id);
    if (!comments) {
      return res.status(404).json({
        status: false,
        data:null,
        message: "Comments not found",
      });
    }
    res.json({
      status: true,
      message: "Comments has been fetched successfully",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while fetching the comments",
    });
  }
};

// fetch recent comments 
const fetchRecentComments = async (req, res) => {
  try {
    const limit = req.query.limit || 10; // Default to 10 if no limit is provided

    const recentComments = await Comment.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit)); // Parse the limit parameter as an integer
    
    res.json({
      status: true,
      message: `Most recent ${limit} comments fetched successfully`,
      data: recentComments,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: "An error occurred while fetching recent comments",
    });
  }
};


// Create a new comments
const createcomments = async (req, res) => {
  try {
    const { articleId, name, text } = req.body;

    
    // Create new comments
    const newcomments = new Comments({
      name,
      articleId,
      text,
    });

    // Save the comments to the database
    const savedcomments = await newcomments.save();

    res.status(201).json({
      status: true,
      message: "Comment created successfully",
      data: savedcomments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred during comments creation",
    });
  }
};

// Edit a comments
const editcomments = async (req, res) => {
  const { id } = req.params;
  const { articleId, name, text } = req.body;
  try {
    const comments = await comments.findByIdAndUpdate(
      id,
      { articleId, name, text },
      { new: true }
    );
    if (!comments) {
      return res.status(404).json({
        status:false,
        data:null,
        message: "Comment not found",
      });
    }
    res.json({
      status: true,
      data: comments,
      message: "Comment has been updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while updating the comments",
    });
  }
};

// Delete a comments (change status to false)
const deletecomments = async (req, res) => {
  const { id, articleId } = req.params;
  try {
    const comments = await comments.findByIdAndUpdate(
      {id , articleId},
      { status: false, delete_at: new Date() },
      { new: true }
    );
    if (!comments) {
      return res.status(404).json({
        status: false,
        data:null,
        message: "Comments not found",
      });
    }
    res.json({
      status: true,
      data: null,
      message: "Comments deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data:null,
      message: "An error occurred while deleting the comments",
    });
  }
};

module.exports = {
  fetchRecentComments,
  getAllComments,
  getCommentsById,
  createcomments,
  editcomments,
  deletecomments,
};
