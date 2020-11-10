import { getProudcts } from './fakeApi';
import Item from './Item';
import { atom, useRecoilValueLoadable } from 'recoil';

const itemsState = atom({
	key: 'items',
	default: getProudcts(),
});

function Items() {
	const itemsLoadable = useRecoilValueLoadable(itemsState);
	switch (itemsLoadable.state) {
		case 'hasValue':
			return (
				<>
					{itemsLoadable.contents.map((it) => (
						<Item key={it.id} item={it} />
					))}
				</>
			);
		case 'loading':
			return <div>Loading...</div>;
		case 'hasError':
			return <div>Error encountered</div>;
		default:
			return;
	}
}

export default Items;
