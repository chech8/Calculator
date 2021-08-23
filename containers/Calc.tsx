import Display from '../components/Display';
import KeyPad from '../containers/KeyPad';
import { DataStreamProvider } from '../contexts/DataStream';


function Calc(){
	return (
		<div className="calculator">
			<DataStreamProvider>
				<Display />
				<KeyPad />
			</DataStreamProvider>
		</div>
	);
}

export default Calc
