const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/:orderId/total", orderController.getOrderTotal);
router.post("/", orderController.createOrder);
router.post("/:orderId/items", orderController.addItemToOrder);
router.delete(
	"/:orderId/items/:orderItemId",
	orderController.deleteItemFromOrder
);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
