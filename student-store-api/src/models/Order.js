const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrders = async () => {
	return prisma.order.findMany();
};

const getOrderById = async (orderId) => {
	return prisma.order.findUnique({
		where: {
			id: parseInt(orderId),
		},
	});
};

const getOrderByIdAndItems = async (orderId) => {
	return {
		...prisma.order.findUnique({
			where: {
				id: parseInt(orderId),
			},
		}),
		order_items: prisma.orderitem.findMany({
			where: {
				id: parseInt(orderId),
			},
		}),
	};
};

const createOrder = async (orderData) => {
	return prisma.order.create({
		data: {
			order_id: parseInt(orderData.order_id),
			customer_id: parseInt(orderData.customer_id),
			total_price: parseFloat(orderData.total_price),
			status: orderData.status,
		},
	});
};

const updateOrder = async (orderId, orderData) => {
	return prisma.order.update({
		where: { id: parseInt(orderId) },
		data: {
			order_id: parseInt(orderData.order_id),
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
	getOrderByIdAndItems,
	createOrder,
	updateOrder,
	deleteOrder,
};
