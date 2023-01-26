import Category from "../models/Category";

// CREATE NEW CATEGORY
export const newCategory = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCategory = await newCat.save();
    res.status(200).json({
      success: true,
      message: "New Category created successfully !",
      savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// GET ALL CATEGORIES

export const getAllCat = async (req, res) => {
  try {
    const allCat = await Category.find();
    res.status(200).json(allCat);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
