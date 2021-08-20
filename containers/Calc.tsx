import { useReducer, createContext, useContext, useState } from 'react';
import { evaluate, round } from 'mathjs';
import Display from '../components/Display.tsx';
import KeyPad from '../containers/KeyPad.tsx';
import DataStream from '../contexts/DataStream';

const initialDataState = {
	expression: '',
	result: '',
};

// Handles functional buttons
function PerformButtonFunction(input: string, expression: string){
	let output = {};
	let temp
	switch (input) {
		case "=":
			try {
				temp = round(evaluate(expression), 10);
			}
			catch (error) {
				temp = error.name;
			}
			output = {
				expression: expression,
				result: temp,
			}
			break;

		case "AC":
			output.expression = '';
			break;

		case "Del":
			output.expression = expression.slice(0, -1);
			break;

		default:
			break;
	}

	return output;
}

// Updates the dataStream according to the type of the button clicked
function dataStreamReducer(state, action) {
	switch (action.type) {
		case "character":
			return {expression: state.expression.concat(action.input)};

		case "functional":
			return PerformButtonFunction(action.input, state.expression);

		default:
			throw new Error();
	}
}

function Calc(props){
	const [dataState, dataDispatch] = useReducer(dataStreamReducer, initialDataState);

	// Links data stream between KeyPad and Display
	const dataLink = {dataState, dataDispatch};

	return (
		<div className="calculator">
			<DataStream.Provider value={dataLink}>
				<Display />
				<KeyPad />
			</DataStream.Provider>
		</div>
	);
}

export default Calc
