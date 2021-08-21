import { useReducer, createContext, useContext, useState } from 'react';
import { evaluate, round } from 'mathjs';
import Display from '../components/Display';
import KeyPad from '../containers/KeyPad';
import DataStream from '../contexts/DataStream';


type DATATYPE = {
	expression: string,
	result: string,
};

type ACTIONTYPE =
  | { type: "character"; input: string }
  | { type: "functional"; input: string };


const initialDataState = {
	expression: '',
	result: '',
};


// Handles functional buttons
function PerformButtonFunction(input: string, prevDataState: DATATYPE){
	let output = prevDataState;
	let temp
	switch (input) {
		case "=":
			try {
				temp = round(evaluate(prevDataState.expression), 10) as string;
			}
			catch (error) {
				temp = error.name;
			}
			output = {
				expression: prevDataState.expression,
				result: temp,
			}
			break;

		case "AC":
			output = {
				expression: '',
				result: '',
			}
			break;

		case "Del":
			output = {
				expression: prevDataState.expression.slice(0, -1),
				result: '',
			} 
			break;

		default:
			break;
	}

	return output;
}

// Updates the dataStream according to the type of the button clicked
function dataStreamReducer(state: DATATYPE, action: any) {
	let output: DATATYPE;
	switch (action.type) {
		case "character":
			output = {
				expression: state.expression.concat(action.input),
				result: state.result,
			};
			return output;

		case "functional":
			 output = PerformButtonFunction(action.input, state);
			 return output;

		default:
			throw new Error();
	}
}

function Calc(){
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
