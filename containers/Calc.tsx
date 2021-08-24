import Display from '../components/Display';
import KeyPad from '../containers/KeyPad';
import { DataStreamProvider } from '../contexts/DataStream';

import type { DATATYPE } from '../contexts/DataStream';


const initialDataState: DATATYPE = {
	expression: '',
	result: '',
};


function Calc(){
	return (
		<div className="calculator">
			<DataStreamProvider initState={initialDataState}>
				<Display />
				<KeyPad />
			</DataStreamProvider>
		</div>
	);
}

export default Calc
