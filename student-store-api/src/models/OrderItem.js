const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrderItems = async () => {
	return prisma.orderItem.findMany();
};

const getOrderItemById = async (orderItemId) => {
	return prisma.orderItem.findUnique({
		where: {
			id: orderItemId,
		},
	});
};

module.exports = {
	getAllOrderItems,
	getOrderItemById,
};
