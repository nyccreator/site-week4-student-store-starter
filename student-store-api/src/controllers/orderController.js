const orderModel = require("../models/Order");

const getAllOrders = async (req, res) => {
	try {
		const orders = await orderModel.getAllOrders();
		res.json(orders);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getOrderById = async (req, res) => {
	try {
		const order = await orderModel.getOrderById(req.params.id);
		res.json(order);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const createOrder = async (req, res) => {
	try {
		const order = await orderModel.createOrder(req.body);
		res.json(order);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const updateOrder = async (req, res) => {
	try {
		const order = await orderModel.updateOrder(req.params.id, req.body);
		res.json(order);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const deleteOrder = async (req, res) => {
	try {
		const order = await orderModel.deleteOrder(req.params.id);
		res.json(order);
	} catch (error) {
		res.json({ error: error.message });
	}
};

module.exports = {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};
