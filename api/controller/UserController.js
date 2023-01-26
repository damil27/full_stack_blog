import User from "../models/User";
import Post from "../models/Post";
import * as bcrypt from "bcrypt";

// registration
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json({ message: "New user created", user });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user &&
      res
        .status(400)
        .json({ success: false, message: "Invalid login credentials" });

    const isPassword = bcrypt.compareSync(password, user.password);
    !isPassword &&
      res
        .status(400)
        .json({ success: false, message: "Invalid login Credentials" });
    // const { password, ...others } = user;
    res
      .status(200)
      .json({ success: true, message: "Login successfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
    console.log(error);
  }
};

// get single users
export const updateUser = async (req, res) => {
  //   const { password, userId } = req.body;
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        success: false,
        message: "user data successfully updated",
        updatedUser,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      console.log(error);
    }
  } else {
    res.status(401).json({
      success: false,
      message: "you can only update your account",
    });
  }
};

// delete function

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
          success: true,
          message: "user deleted successfully",
          deleteUser,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    } catch (error) {
      res.status(404).json({ success: false, message: "user not found!" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "you can only delete your acccount!" });
  }
};

// Get single user

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ success: true, others });
  } catch (error) {
    res.status(500).json({ success: false, Message: "Internal server error!" });
  }
};
