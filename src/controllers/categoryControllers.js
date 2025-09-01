import Category from '../models/Category.js';

// ✅ Create Category
export const createCategory = async (req, res) => {
  console.log("create category called!!!");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  
  try {
    const { title, stock, tagId, gender } = req.body;
    const thumbnail = req.file ? { url: req.file.path, public_id: req.file.filename } : null;

    if (!thumbnail) return res.status(400).json({ success: false, message: 'Thumbnail image is required' });

    const category = await Category.create({ title, stock, tagId, gender, thumbnail });
    res.status(201).json({ success: true, message: 'Category created successfully', data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Categories
export const getCategories = async (req, res) => {
  console.log("get all categories called");
  
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { title, stock, tagId, gender } = req.body;
    let updateData = { title, stock, tagId, gender };

    if (req.file) {
      updateData.thumbnail = { url: req.file.path, public_id: req.file.filename };
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
