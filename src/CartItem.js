import { getProudctById } from './fakeApi';
import { atomFamily, useRecoilStateLoadable } from 'recoil';

export const cartItemState = atomFamily({
	key: 'cartItem',
	default: (id) => getProudctById(id),
});

function CartItem({ id, deleteItem }) {
	const [itemLoadable, setItemLoadble] = useRecoilStateLoadable(
		cartItemState(id)
	);
	const increment = () => {
		let { price, quantity } = itemLoadable.contents;
		const initialPrice = price / quantity;
		quantity++;
		price = initialPrice * quantity;
		setItemLoadble({ ...itemLoadable.contents, quantity, price });
	};
	const decrement = () => {
		let { price, quantity } = itemLoadable.contents;
		if (quantity > 1) {
			const initialPrice = price / quantity;
			quantity--;
			price = initialPrice * quantity;
			setItemLoadble({ ...itemLoadable.contents, price, quantity });
		} else {
			deleteItem(id);
		}
	};
	switch (itemLoadable.state) {
		case 'hasValue':
			return (
				<div>
					<img
						className='cart-image'
						src={itemLoadable.contents.image}
						alt=''
					/>
					<p>{itemLoadable.contents.title}</p>
					<button onClick={increment}>+</button>
					<button onClick={decrement}>-</button>
					<p>{itemLoadable.contents.quantity}</p>
					<p>{itemLoadable.contents.price}</p>
				</div>
			);
		case 'loading':
			return <div>Loading...</div>;
		case 'hasError':
			return <div>Error...</div>;
		default:
			return;
	}
}

export default CartItem;
