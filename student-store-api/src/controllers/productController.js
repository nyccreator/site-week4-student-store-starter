const productModel = require("../models/Product");

const getAllProducts = async (req, res) => {
	try {
		const { category, sort } = req.query;
		const products = await productModel.getAllProducts();
		let finalProducts = products;
		if (category) {
			finalProducts = finalProducts.filter(
				(product) => product.category.toLowerCase() === category.toLowerCase()
			);
		}
		if (sort) {
			if (sort === "name") {
				finalProducts = finalProducts.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return 1;
					} else if (a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					}
					return 0;
				});
			} else if (sort === "price") {
				finalProducts = finalProducts.sort((a, b) => {
					if (a.price > b.price) {
						return 1;
					} else if (a.price < b.price) {
						return -1;
					}
					return 0;
				});
			}
		}
		res.json(finalProducts);
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
