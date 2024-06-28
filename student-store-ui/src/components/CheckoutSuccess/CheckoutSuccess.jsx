import "./CheckoutSuccess.css";
import axios from "axios";
import { useState, useEffect } from "react";

const CheckoutSuccess = ({ order, setOrder, products }) => {
	const [orders, setOrders] = useState([]);
	const [displayOrders, setDisplayOrders] = useState("none");
	const [displayDetails, setDisplayDetails] = useState("none");
	const [emailInputValue, setEmailInputValue] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await axios.get("http://localhost:3000/orders");
			const data = response.data;
			setOrders(data);
		};
		fetchOrders();
	}, []);

	const handleOnClose = () => {
		setOrder(null);
	};

	const renderReceipt = () => (
		<>
			<p className="header">{order.purchase.receipt.lines[0]}</p>
			<ul className="purchase">
				{order.purchase.receipt.lines
					.slice(1)
					.map((line, idx) =>
						Boolean(line) ? <li key={idx}>{line}</li> : null
					)}
			</ul>
		</>
	);

	const handleOnEmailInputChange = (event) => {
		setEmailInputValue(event.target.value);
	};

	return (
		<div className="CheckoutSuccess">
			<h3>
				Checkout Info{" "}
				<span className={`icon button`}>
					<i className="material-icons md-48">fact_check</i>
				</span>
			</h3>
			{order?.status === "completed" ? (
				<div className="card">
					<header className="card-head">
						<h4 className="card-title">Receipt</h4>
					</header>
					<section className="card-body">
						{order?.purchase?.receipt ? renderReceipt() : "Success!"}
					</section>
					<footer className="card-foot">
						<button className="button is-success" onClick={handleOnClose}>
							Shop More
						</button>
						<button className="button" onClick={handleOnClose}>
							Exit
						</button>
					</footer>
				</div>
			) : (
				<div className="content">
					<p>
						A confirmation email will be sent to you so that you can confirm
						this order. Once you have confirmed the order, it will be delivered
						to your dorm room.
					</p>
				</div>
			)}
			<div id="past-order-title">
				<h3
					style={{ color: "white" }}
					onClick={() => {
						if (displayOrders === "none") {
							setDisplayOrders("block");
						} else {
							setDisplayOrders("none");
						}
					}}
				>
					Past Orders
				</h3>
				<div id="past-orders" style={{ display: `${displayOrders}` }}>
					<input
						style={{ margin: "1rem 0" }}
						type="text"
						name="Email"
						placeholder="Email"
						value={emailInputValue}
						onChange={handleOnEmailInputChange}
					/>
					{emailInputValue === ""
						? orders.map((order, index) => (
								<div
									key={index}
									style={{ backgroundColor: "white", padding: "1rem" }}
								>
									<h4>Placed By: Customer {order.customer_id}</h4>
									<h4>Email: {order.email}</h4>
									<h4>Total Price: {order.total_price}</h4>
									<h4
										onClick={() => {
											if (displayDetails === "none") {
												setDisplayDetails("flex");
											} else {
												setDisplayDetails("none");
											}
										}}
									>
										Show Details
									</h4>
									<div
										style={{
											padding: "1rem",
											display: `${displayDetails}`,
											flexDirection: "column",
											gap: "1rem",
										}}
									>
										{order.order_items.map((order_item) => (
											<div
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
												}}
											>
												<h5 style={{ color: "orange" }}>
													{
														products.find(
															(product) =>
																parseInt(product.id) ===
																parseInt(order_item.product_id)
														).name
													}
												</h5>
												<h5 style={{ color: "orange" }}>
													{order_item.quantity}
												</h5>
												<h5 style={{ color: "orange" }}>{order_item.price}</h5>
											</div>
										))}
									</div>
								</div>
						  ))
						: orders
								.filter((order) => order.email.startsWith(emailInputValue))
								.map((order, index) => (
									<div
										key={index}
										style={{ backgroundColor: "white", padding: "1rem" }}
									>
										<h4>Placed By: Customer {order.customer_id}</h4>
										<h4>Email: {order.email}</h4>
										<h4>Total Price: {order.total_price}</h4>
										<h4>Show Details</h4>
										<div
											style={{
												padding: "1rem",
												display: "flex",
												flexDirection: "column",
												gap: "1rem",
											}}
										>
											{order.order_items.map((order_item) => (
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														justifyContent: "space-between",
													}}
												>
													<h5 style={{ color: "orange" }}>
														{
															products.find(
																(product) =>
																	parseInt(product.id) ===
																	parseInt(order_item.product_id)
															).name
														}
													</h5>
													<h5 style={{ color: "orange" }}>
														{order_item.quantity}
													</h5>
													<h5 style={{ color: "orange" }}>
														{order_item.price}
													</h5>
												</div>
											))}
										</div>
									</div>
								))}
				</div>
			</div>
		</div>
	);
};

export default CheckoutSuccess;
