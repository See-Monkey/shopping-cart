import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import Shop from "./components/Shop/Shop.jsx";
import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import Cart from "./components/Cart/Cart.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "home", element: <Home /> },

			{ path: "shop", element: <Shop /> },
			{ path: "shop/:category", element: <Shop /> },

			{ path: "product/:productId", element: <ProductDetail /> },

			{ path: "cart", element: <Cart /> },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
