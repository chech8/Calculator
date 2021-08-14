import { useState } from "react";
import Input from '../components/Input.tsx'

function KeyPad(props){
	const inputChars = [['',    '',    'Del', 'AC'],
											['7',   '8',   '9',   '/'],
											['4',   '5',   '6',   '*'],
											['1',   '2',   '3',   '-'],
											['0',   '.',   '=',   '+']];
	const rows = [];

	for (let row in inputChars) {
		let rowItems = [];
		for (let index in inputChars[row]) {
			rowItems.push(<button label={inputChars[row][index]}>{inputChars[row][index]}</button>);
			//rowItems.push(<Input char={inputChars[row][index]} />);
		}
		rows.push(rowItems);
		rows.push(<div className="input-row" />)
	}

	return rows;
}

export default KeyPad
