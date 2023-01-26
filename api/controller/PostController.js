import Post from "../models/Post";

export const newPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      success: true,
      message: "new Post created",
      savedPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server problem!" });
  }
};

// update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: " Post updated Successfully",
          updatePost,
        });
      } catch (error) {
        res.status(401).json({
          success: false,
          message: "Something went wrong, Try again !",
        });
        console.log(error);
      }
    } else {
      res.status(401).json({
        success: false,
        message: "You are only allowed to update your post",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error!",
    });
    console.log(error);
  }
};

// Delete post

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        const deletePost = await post.delete();
        res.status(200).json({
          success: true,
          message: "Post successfully deleted",
          deletePost,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal server error!" });
        console.log(error);
      }
    } else {
      res.status(404).json({
        success: false,
        message: "You are only allowed to delete your post!",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET POST

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      success: false,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// GET ALL POST
export const getAllPost = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server errorr!",
    });
  }
};
