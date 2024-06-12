const { Order } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user_id: req.user.id }); // Assuming req.user is set from auth middleware
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { user_id: req.user.id } });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
