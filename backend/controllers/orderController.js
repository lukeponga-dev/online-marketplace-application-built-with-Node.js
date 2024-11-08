const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  try {
    const order = new Order({
      buyer: req.user.id,
      items,
      totalAmount,
    });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error('Get buyer orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
