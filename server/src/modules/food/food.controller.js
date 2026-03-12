const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { createFood, getFoods } = require('./food.service');
const { getMenuGroupedByCategory } = require('./food.service');

const menuGrouped = asyncHandler(async (req, res) => {
  const menu = await getMenuGroupedByCategory();

  res.status(200).json(new ApiResponse(200, menu, 'Menu grouped'));
});

const addFood = asyncHandler(async (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  const food = await createFood(req.body, req.file);

  res.status(201).json(new ApiResponse(201, food, 'Food created successfully'));
});

const listFoods = asyncHandler(async (req, res) => {
  const result = await getFoods(req.query);

  res.status(200).json(new ApiResponse(200, result, 'Foods fetched'));
});

module.exports = {
  addFood,
  listFoods,
  menuGrouped,
};
