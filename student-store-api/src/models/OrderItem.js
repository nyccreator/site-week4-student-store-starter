const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrderItems = async () => {
	return prisma.orderitem.findMany();
};

const getOrderItemById = async (orderItemId) => {
	return prisma.orderitem.findUnique({
		where: {
			id: orderItemId,
		},
	});
};

const createOrderItem = async (orderItemData) => {
	return prisma.orderitem.create({
		data: {
			order_id: orderItemData.order_id,
			product_id: orderItemData.product_id,
			quantity: orderItemData.quantity,
			price: orderItemData.price,
		},
	});
};

module.exports = {
	getAllOrderItems,
	getOrderItemById,
	createOrderItem,
};
