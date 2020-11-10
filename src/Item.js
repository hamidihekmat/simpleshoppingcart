import { CartState } from './Cart';
import { useRecoilState } from 'recoil';

function Item({ item }) {
	const [cart, setCart] = useRecoilState(CartState);
	const handleClick = (id) => {
		const exists = cart.filter((cid) => cid === id).length;
		if (!exists) setCart([...cart, id]);
	};
	return (
		<div className='item'>
			<img src={item.image} alt='item' />
			<h2>{item.title}</h2>
			<h4>${item.price}</h4>
			<button onClick={() => handleClick(item.id)}>Add to cart</button>
		</div>
	);
}

export default Item;
