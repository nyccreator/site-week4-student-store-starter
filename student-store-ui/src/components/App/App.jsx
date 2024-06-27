import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import {
	removeFromCart,
	addToCart,
	getQuantityOfItemInCart,
	getTotalItemsInCart,
} from "../../utils/cart";
import "./App.css";

function App() {
	// State variables
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState("All Categories");
	const [searchInputValue, setSearchInputValue] = useState("");
	const [userInfo, setUserInfo] = useState({ id: "", email: "" });
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [error, setError] = useState(null);
	const [order, setOrder] = useState(null);

	useEffect(() => {
		setIsFetching(true);
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:3000/products");
				const data = response.data;
				setProducts(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsFetching(false);
			}
		};
		fetchProducts();
	}, []);

	// Toggles sidebar
	const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

	// Functions to change state (used for lifting state)
	const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
	const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
	const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
	const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

	const handleOnSearchInputChange = (event) => {
		setSearchInputValue(event.target.value);
	};

	const handleOnCheckout = async () => {
		setIsCheckingOut(true);

		const newOrder = {
			customer_id: userInfo.id,
			email: userInfo.email,
			status: "in progress",
		};

		const response = await axios.post(
			"http://localhost:3000/orders/",
			newOrder
		);

		const data = response.data;

		for (const [key, value] of Object.entries(cart)) {
			const orderItem = {
				product_id: parseInt(key),
				quantity: parseInt(value),
			};

			const response2 = await axios.post(
				`http://localhost:3000/orders/${data.order_id}/items`,
				orderItem
			);
		}

		const updatedOrder = {
			status: "completed",
		};

		const response3 = await axios.put(
			`http://localhost:3000/orders/${data.order_id}`,
			updatedOrder
		);

		const response4 = await axios.get(
			`http://localhost:3000/orders/${data.order_id}`
		);

		const data2 = response4.data;
		setOrder(data2);

		setCart({});
		setIsCheckingOut(false);
	};

	return (
		<div className="App">
			<BrowserRouter>
				<Sidebar
					cart={cart}
					error={error}
					userInfo={userInfo}
					setUserInfo={setUserInfo}
					isOpen={sidebarOpen}
					products={products}
					toggleSidebar={toggleSidebar}
					isCheckingOut={isCheckingOut}
					addToCart={handleOnAddToCart}
					removeFromCart={handleOnRemoveFromCart}
					getQuantityOfItemInCart={handleGetItemQuantity}
					getTotalItemsInCart={handleGetTotalCartItems}
					handleOnCheckout={handleOnCheckout}
					order={order}
					setOrder={setOrder}
				/>
				<main>
					<SubNavbar
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
						searchInputValue={searchInputValue}
						handleOnSearchInputChange={handleOnSearchInputChange}
					/>
					<Routes>
						<Route
							path="/"
							element={
								<Home
									error={error}
									products={products}
									isFetching={isFetching}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
									addToCart={handleOnAddToCart}
									searchInputValue={searchInputValue}
									removeFromCart={handleOnRemoveFromCart}
									getQuantityOfItemInCart={handleGetItemQuantity}
								/>
							}
						/>
						<Route
							path="/:productId"
							element={
								<ProductDetail
									cart={cart}
									error={error}
									products={products}
									addToCart={handleOnAddToCart}
									removeFromCart={handleOnRemoveFromCart}
									getQuantityOfItemInCart={handleGetItemQuantity}
								/>
							}
						/>
						<Route
							path="*"
							element={
								<NotFound
									error={error}
									products={products}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
								/>
							}
						/>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
