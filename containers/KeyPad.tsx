import InputKey from '../components/InputKey.tsx';

function KeyPad(props){
	const keyLayout =
		[['',   '',    'Del', 'AC'],
		['7',   '8',   '9',   '/'],
		['4',   '5',   '6',   '*'],
		['1',   '2',   '3',   '-'],
		['0',   '.',   '=',   '+']];

	const keyRows = [];

	for (let row in keyLayout) {
		let rowItems = [];
		for (let index in keyLayout[row]) {
			rowItems.push(<InputKey char={keyLayout[row][index]}/>);
		}
		keyRows.push(rowItems);
		keyRows.push(<div className="key-row" />)
	}
	//keyRows.push(<button onClick={() => props.setData(1)}>debug</button>)

	return keyRows;
}

export default KeyPad
