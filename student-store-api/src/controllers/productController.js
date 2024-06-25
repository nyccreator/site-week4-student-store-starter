const productModel = require("../models/Product");

const getAllProducts = async (req, res) => {
	try {
		let { category, sort, order } = req.query;
		let filter = {};
		let orderBy = {};
		if (category) {
			filter.category = category;
		}
		if (!order) {
			order = "desc";
		}
		if (sort === "price") {
			orderBy = { price: order };
		} else if (sort === "name") {
			orderBy = { name: order };
		}
		const products = await productModel.getAllProducts(filter, orderBy);
		res.json(products);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getProductById = async (req, res) => {
	try {
		const product = await productModel.getProductById(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const createProduct = async (req, res) => {
	try {
		const product = await productModel.createProduct(req.body);
		res.json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const product = await productModel.updateProduct(req.params.id, req.body);
		res.json(product);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const product = await productModel.deleteProduct(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
