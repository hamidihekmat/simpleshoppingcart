import axios from 'axios';

const config = {
	headers: { 'Access-Control-Allow-Origin': '*' },
};

export async function getProudcts() {
	const { data } = await axios.get('https://fakestoreapi.com/products', config);
	console.log(data);
	return data;
}

export async function getProudctById(id) {
	const { data } = await axios.get(
		`https://fakestoreapi.com/products/${id}`,
		config
	);
	return { ...data, quantity: 1 };
}
