const Food = require('./food.model');
const uploadToCloudinary = require('../../utils/cloudinaryUpload');
const Category = require('../category/category.model');

const createFood = async (data, file) => {
  if (!file) {
    throw new Error('Food image required');
  }

  // ✅ category validation
  const categoryExists = await Category.findById(data.category);
  if (!categoryExists) {
    throw new Error('Invalid category');
  }

  const uploadResult = await uploadToCloudinary(file.buffer);

  const food = await Food.create({
    ...data,
    image: uploadResult.secure_url,
  });

  return food;
};

const getFoods = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || '';

  const skip = (page - 1) * limit;

  const filter = {
    name: { $regex: search, $options: 'i' },
  };

  const foods = await Food.find(filter)
    .populate('category', 'name image')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Food.countDocuments(filter);
  return {
    foods,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

const getMenuGroupedByCategory = async () => {
  const categories = await Category.find({ isActive: true }).sort({
    sortOrder: 1,
  });

  const menu = [];

  for (const category of categories) {
    const foods = await Food.find({
      category: category._id,
      isAvailable: true,
    }).sort({ createdAt: -1 });

    menu.push({
      category,
      foods,
    });
  }

  return menu;
};

module.exports = {
  createFood,
  getFoods,
  getMenuGroupedByCategory,
};
