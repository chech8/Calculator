import { useReducer, createContext, useContext, useState } from 'react';
import Display from '../components/Display.tsx';
import KeyPad from '../containers/KeyPad.tsx';
import DataStream from '../contexts/DataStream';

const initialState = {
	data: '',
	updateRequest: false,
};

function reducer(state, action) {
	switch (action.type) {
		case 'setData':
			return {data: action.input, updateRequest: true};
		case 'clearRequest':
			return {updateRequest: false};
		default:
			throw new Error();
	}
}

function Calc(props){
	const [dataState, dataDispatch] = useReducer(reducer, initialState);

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
