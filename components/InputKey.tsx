import { useContext } from 'react';
import DataStream from '../contexts/DataStream';

// Evaluates the type of the button, and returns appropriate action to the
// reducer. Possible button types are
// character - Digits or Operators that should be added to the expression on
//             the display
// functional - Performs an action that affects a whole expression (i.e.
//              All Clear)
function CheckButtonType(funcKeys, char){
	if (funcKeys.includes(char)) {
		return {
			type: "functional",
			input: char,
		};
	}
	else {
		return {
			type: "character",
			input: char,
		};
	}
}

function InputKey(props){
	const dataInput = useContext(DataStream);

	return (
		<input
			type="button"
			className="input-key"
			label={props.char}
			value={props.char}
			onClick={() => {
				dataInput.dataDispatch(CheckButtonType(props.funcKeys, props.char))
			}}
		/>
	);
}

export default InputKey
