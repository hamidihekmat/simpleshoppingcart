import CartItem, { cartItemState } from './CartItem';
import { atom, useRecoilState, selector, useRecoilValueLoadable } from 'recoil';

export const CartState = atom({
	key: 'cart',
	default: [],
});

export const totalCartPrice = selector({
	key: 'totalCartPrice',
	get: ({ get }) => {
		const cartIds = get(CartState);
		const items = cartIds.map((id) => get(cartItemState(id)));
		let sum = 0;
		items.forEach((item) => {
			sum += Number(item.price);
		});

		return sum;
	},
});

function Cart() {
	const [cart, setCart] = useRecoilState(CartState);

	//const totalPrice = useRecoilValue(totalCartPrice);
	const totalPrice = useRecoilValueLoadable(totalCartPrice);
	const deleteItem = (id) => {
		const filteredCart = cart.filter((cid) => cid !== id);
		setCart(filteredCart);
	};
	switch (totalPrice.state) {
		case 'hasValue':
			return (
				<div>
					{cart.map((id) => (
						<CartItem key={id} id={id} deleteItem={deleteItem} />
					))}
					<p>${totalPrice.contents.toFixed(2)}</p>
				</div>
			);
		case 'loading':
			return <div>Loading...</div>;
		case 'hasError':
			return <div></div>;
		default:
			return;
	}
}

export default Cart;
