const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrders = async () => {
	return prisma.order.findMany({
		include: {
			order_items: true,
		},
	});
};

const getOrderById = async (orderId) => {
	return prisma.order.findUnique({
		where: {
			order_id: parseInt(orderId),
		},
		include: {
			order_items: true,
		},
	});
};

const getOrderTotal = async (orderId) => {
	const order = await getOrderById(orderId);
	return order.total_price;
};

const createOrder = async (orderData) => {
	return prisma.order.create({
		data: {
			customer_id: parseInt(orderData.customer_id),
			email: orderData.email,
			status: orderData.status,
		},
	});
};

const addItemToOrder = async (orderId, orderItemData) => {
	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(orderItemData.product_id),
		},
	});

	if (!product) {
		throw new Error("Product not found");
	}

	const order = await prisma.order.findUnique({
		where: {
			order_id: parseInt(orderId),
		},
	});

	if (!order) {
		throw new Error("Order not found");
	}

	await prisma.order.update({
		where: {
			order_id: parseInt(orderId),
		},
		data: {
			total_price:
				parseFloat(order.total_price) +
				parseFloat(product.price) * parseInt(orderItemData.quantity) * 1.0875,
		},
	});

	return prisma.orderItem.create({
		data: {
			order_id: parseInt(orderId),
			product_id: parseInt(orderItemData.product_id),
			quantity: parseInt(orderItemData.quantity),
			price: parseFloat(product.price) * parseInt(orderItemData.quantity),
		},
	});
};

const deleteItemFromOrder = async (orderId, orderItemId) => {
	const order = await prisma.order.findUnique({
		where: {
			order_id: parseInt(orderId),
		},
	});

	if (!order) {
		throw new Error("Order not found");
	}

	const orderItem = await prisma.orderItem.findUnique({
		where: {
			order_item_id: parseInt(orderItemId),
		},
	});

	if (!orderItem) {
		throw new Error("Order item not found");
	}

	if (parseInt(orderItem.order_id) !== parseInt(orderId)) {
		throw new Error("Order item not found in this order");
	}

	await prisma.order.update({
		where: {
			order_id: parseInt(orderId),
		},
		data: {
			total_price:
				parseFloat(order.total_price) - parseFloat(orderItem.price) * 1.0875,
		},
	});

	return prisma.orderItem.delete({
		where: {
			order_item_id: parseInt(orderItemId),
		},
	});
};

const updateOrder = async (orderId, orderData) => {
	return prisma.order.update({
		where: { order_id: parseInt(orderId) },
		data: {
			status: orderData.status,
		},
	});
};

const deleteOrder = async (orderId) => {
	return prisma.order.delete({ where: { order_id: parseInt(orderId) } });
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
