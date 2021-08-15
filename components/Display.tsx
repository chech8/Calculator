import { useContext, useEffect, useState } from 'react';
import DataStream from '../contexts/DataStream';

function Display(props){
	const dataInput = useContext(DataStream);
	const [dataString, setDataString] = useState('')

	useEffect(() => {
		if (dataInput.dataState.updateRequest) {
			setDataString(dataString.concat(dataInput.dataState.data));
			dataInput.dataDispatch({type: "clearRequest"})
		}
	});

	return <div className="display">{dataString}</div>;
}

export default Display
