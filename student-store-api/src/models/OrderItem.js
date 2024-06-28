const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrderItems = async () => {
	return prisma.orderItem.findMany();
};

const getOrderItemById = async (orderItemId) => {
	return prisma.orderItem.findUnique({
		where: {
			order_item_id: parseInt(orderItemId),
		},
	});
};

const createOrderItem = async (orderItemData) => {
	const product = await prisma.product.findUnique({
		where: {
			order_item_id: parseInt(orderItemData.product_id),
		},
	});

	return prisma.orderItem.create({
		data: {
			product_id: parseInt(orderItemData.product_id),
			quantity: parseInt(orderItemData.quantity),
			price: parseFloat(product.price) * parseInt(orderItemData.quantity),
		},
	});
};

const updateOrderItem = async (orderItemId, orderItemData) => {
	const product = await prisma.product.findUnique({
		where: {
			order_item_id: parseInt(orderItemData.product_id),
		},
	});

	return prisma.orderItem.update({
		where: {
			order_item_id: parseInt(orderItemId),
		},
		data: {
			product_id: parseInt(orderItemData.product_id),
			quantity: parseInt(orderItemData.quantity),
			price: parseFloat(product.price) * parseInt(orderItemData.quantity),
		},
	});
};

const deleteOrderItem = async (orderItemId) => {
	return prisma.orderItem.delete({
		where: {
			order_item_id: parseInt(orderItemId),
		},
	});
};

module.exports = {
	getAllOrderItems,
	getOrderItemById,
	createOrderItem,
	updateOrderItem,
	deleteOrderItem,
};
