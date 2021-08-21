import { useContext } from 'react';
import DataStream from '../contexts/DataStream';


function Display(){
	const dataToDisplay = useContext(DataStream);

	return (
		<div className="display">
			<div className="display-expression">{dataToDisplay.dataState.expression}</div>
			<div className="display-result">{dataToDisplay.dataState.result}</div>
		</div>
	);
}

export default Display
