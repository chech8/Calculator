import { useContext, useEffect, useState } from 'react';
import DataStream from '../contexts/DataStream';

function Display(props){
	const dataToDisplay = useContext(DataStream);

	return (
		<div className="display">
			<div className="display-expression">{dataToDisplay.dataState.expression}</div>
			<div className="display-result">{dataToDisplay.dataState.result}</div>
		</div>
	);
}

export default Display
