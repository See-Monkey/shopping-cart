const url = "https://fakestoreapi.com/products";

const fetchData = async function () {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
	return response.json();
};

const returnData = async function () {
	let data = null;

	try {
		data = await fetchData();
	} catch (err) {
		console.error(err);
	}

	return data;
};

export default returnData;
