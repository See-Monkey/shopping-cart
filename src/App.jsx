import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import fetchProducts from "./functions/fetchProducts.js";

function App() {
	const [loading, setLoading] = useState(true);
	const [productArray, setProductArray] = useState([]);

	useEffect(() => {
		async function getProducts() {
			setLoading(true);

			const data = await fetchProducts();
			setProductArray(data);
			setLoading(false);
		}
		getProducts();
	}, []);

	const outletContext = { loading, productArray };

	return (
		<>
			<Header />
			<Outlet context={outletContext} />
			<Footer />
		</>
	);
}

export default App;
