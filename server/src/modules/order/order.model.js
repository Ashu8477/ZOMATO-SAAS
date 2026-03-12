const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    total: Number,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },

    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'out_for_delivery',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
