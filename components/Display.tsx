import { useContext } from 'react';
import DataStream from '../contexts/DataStream';

function Display(props){
	const dataToDisplay = useContext(DataStream);
	return <div className="display">{dataToDisplay.data}</div>;
}

export default Display
