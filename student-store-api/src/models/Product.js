const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (filter = {}, orderBy = {}) => {
	return prisma.product.findMany({
		where: filter,
		orderBy: orderBy,
	});
};

const getProductById = async (productId) => {
	return prisma.product.findUnique({
		where: {
			id: parseInt(productId),
		},
	});
};

const createProduct = async (productData) => {
	return prisma.product.create({
		data: {
			name: productData.name,
			description: productData.description,
			price: parseFloat(productData.price),
			image_url: productData.image_url,
			category: productData.category,
		},
	});
};

const updateProduct = async (productId, productData) => {
	return prisma.product.update({
		where: {
			id: parseInt(productId),
		},
		data: {
			name: productData.name,
			description: productData.description,
			price: parseFloat(productData.price),
			image_url: productData.image_url,
			category: productData.category,
		},
	});
};

const deleteProduct = async (productId) => {
	return prisma.product.delete({ where: { id: parseInt(productId) } });
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
