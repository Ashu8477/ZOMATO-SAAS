const Cart = require('./cart.model');
const Food = require('../food/food.model');

const addToCart = async (userId, foodId, qty = 1) => {
  const food = await Food.findById(foodId);
  if (!food) throw new Error('Food not found');

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.food.toString() === foodId,
  );

  if (existingItem) {
    existingItem.quantity += qty;
    existingItem.total = existingItem.quantity * existingItem.price;
  } else {
    cart.items.push({
      food: food._id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: qty,
      total: food.price * qty,
    });
  }

  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);

  await cart.save();

  return cart;
};

const getCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate('items.food');
};

module.exports = {
  addToCart,
  getCart,
};
const updateCartItem = async (userId, foodId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error('Cart not found');

  // remove item case
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.food.toString() !== foodId);

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);

    await cart.save();
    return cart;
  }

  const item = cart.items.find((i) => i.food.toString() === foodId);

  if (!item) throw new Error('Item not found');

  item.quantity = quantity;
  item.total = item.price * quantity;

  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);

  await cart.save();

  return cart;
};

module.exports.updateCartItem = updateCartItem;
