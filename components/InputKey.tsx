import { useContext } from 'react';
import DataStream from '../contexts/DataStream';

function InputKey(props){
	const dataToSet = useContext(DataStream);

	return <input
		type="button"
		className="input-key"
		label={props.char}
		value={props.char}
		onClick={() => dataToSet.dataDispatch({
			type: "setData",
			input: props.char,
		})}
	/>;
}

export default InputKey
