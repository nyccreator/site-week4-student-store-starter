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
			total_price: parseFloat(orderData.total_price),
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

	const order = await prisma.order.findUnique({
		where: {
			order_id: parseInt(orderId),
		},
	});

	await prisma.order.update({
		where: {
			order_id: parseInt(orderId),
		},
		data: {
			total_price:
				parseFloat(order.total_price) +
				parseFloat(product.price) * parseInt(orderItemData.quantity),
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

	const orderItem = await prisma.orderItem.findUnique({
		where: {
			order_item_id: parseInt(orderItemId),
		},
	});

	await prisma.order.update({
		where: {
			order_id: parseInt(orderId),
		},
		data: {
			total_price: parseFloat(order.total_price) - parseFloat(orderItem.price),
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
		where: { id: parseInt(orderId) },
		data: {
			customer_id: parseInt(orderData.customer_id),
			total_price: parseFloat(orderData.total_price),
			status: orderData.status,
		},
	});
};

const deleteOrder = async (orderId) => {
	return prisma.order.delete({ where: { id: parseInt(orderId) } });
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
