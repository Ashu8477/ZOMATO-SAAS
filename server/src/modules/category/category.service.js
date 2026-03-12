const Category = require('./category.model');
const uploadToCloudinary = require('../../utils/cloudinaryUpload');

const createCategory = async (data, file) => {
  let imageUrl = '';

  if (file) {
    const uploadResult = await uploadToCloudinary(file.buffer);
    imageUrl = uploadResult.secure_url;
  }

  const category = await Category.create({
    ...data,
    image: imageUrl,
  });

  return category;
};

const getCategories = async () => {
  return await Category.find({ isActive: true }).sort({ sortOrder: 1 });
};

module.exports = {
  createCategory,
  getCategories,
};
