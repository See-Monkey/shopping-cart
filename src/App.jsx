import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import fetchProducts from "./functions/fetchProducts.js";

function App() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		async function getProducts() {
			setLoading(true);

			const data = await fetchProducts();
			setProducts(data);
			setLoading(false);
		}
		getProducts();
	}, []);

	const outletContext = { loading, products };

	return (
		<>
			<Header />
			<Outlet context={outletContext} />
			<Footer />
		</>
	);
}

export default App;
