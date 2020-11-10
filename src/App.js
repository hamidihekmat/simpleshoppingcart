import './App.css';
import Items from './Items';
import Cart from './Cart';

function App() {
	return (
		<div className='App'>
			<div className='items'>
				<h1>Shop</h1>
				<Items />
			</div>
			<div className='cart'>
				<h1>Cart</h1>
				<Cart />
			</div>
		</div>
	);
}

export default App;
