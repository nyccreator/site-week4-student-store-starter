const orderItemModel = require("../models/OrderItem");

const getAllOrderItems = async (req, res) => {
	try {
		const orderItems = await orderItemModel.getAllOrderItems();
		res.json(orderItems);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const getOrderItemById = async (req, res) => {
	try {
		const orderItem = await orderItemModel.getOrderItemById(req.params.id);
		res.json(orderItem);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const createOrderItem = async (req, res) => {
	try {
		const orderItem = await orderItemModel.createOrderItem(req.body);
		res.json(orderItem);
	} catch (error) {
		res.json({ error: error.message });
	}
};

module.exports = {
	getAllOrderItems,
	getOrderItemById,
	createOrderItem,
};
