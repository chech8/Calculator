import { useReducer, createContext, useContext, useState } from 'react';
import Display from '../components/Display.tsx';
import KeyPad from '../containers/KeyPad.tsx';
import DataStream from '../contexts/DataStream';

function Calc(props){
	const [data, setData] = useState(null);

	const dataState = {data, setData};

	return (
		<div className="calculator">
			<DataStream.Provider value={dataState}>
				<Display />
				<KeyPad />
			</DataStream.Provider>
		</div>
	);
}

export default Calc
