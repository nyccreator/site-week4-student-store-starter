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

const getOrderTotal = async (req, res) => {
	try {
		const orderTotal = await orderModel.getOrderTotal(req.params.orderId);
		res.json(orderTotal);
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

const addItemToOrder = async (req, res) => {
	try {
		const orderItem = orderModel.addItemsToOrder(req.params.orderId, req.body);
		res.json(orderItem);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const deleteItemFromOrder = async (req, res) => {
	try {
		const orderItem = orderModel.deleteItemFromOrder(
			req.params.orderId,
			req.params.orderItemId
		);
		res.json(orderItem);
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
	getOrderTotal,
	createOrder,
	addItemToOrder,
	deleteItemFromOrder,
	updateOrder,
	deleteOrder,
};
