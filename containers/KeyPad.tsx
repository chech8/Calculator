import InputKey from '../components/InputKey';


const keyLayout =
	[['(', ')',  'Del', 'AC'],
	['7',  '8', '9',   '/'],
	['4',  '5', '6',   '*'],
	['1',  '2', '3',   '-'],
	['0',  '.', '=',   '+']];

const functionalKeys = ['=', 'AC', 'Del'];


function KeyPad(){
	const keyRows = [];

	for (let row in keyLayout) {
		let rowItems = [];
		for (let index in keyLayout[row]) {
			rowItems.push(<InputKey
				char={keyLayout[row][index]}
				funcKeys = {functionalKeys}
			/>);
		}
		keyRows.push(rowItems);
		keyRows.push(<div className="key-row" />)
	}

	return (
		<div className="key-pad">
			{keyRows}
		</div>
	);
}

export default KeyPad