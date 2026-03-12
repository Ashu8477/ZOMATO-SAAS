const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { createCategory, getCategories } = require('./category.service');

const addCategory = asyncHandler(async (req, res) => {
  const category = await createCategory(req.body, req.file);

  res
    .status(201)
    .json(new ApiResponse(201, category, 'Category created successfully'));
});

const listCategories = asyncHandler(async (req, res) => {
  const categories = await getCategories();

  res.status(200).json(new ApiResponse(200, categories, 'Categories fetched'));
});

module.exports = {
  addCategory,
  listCategories,
};
