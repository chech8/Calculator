import { useContext } from 'react';
import { DataStream } from '../contexts/DataStream';
import { functionalKeys } from '../containers/KeyPad';


type Props = {
	char: string;
};


// Evaluates the type of the button, and returns appropriate action to the
// reducer. Possible button types are
// character - Digits or Operators that should be added to the expression on
//             the display
// functional - Performs an action that affects a whole expression (i.e.
//              All Clear)
function CheckButtonType(char: string){
	if (functionalKeys.includes(char)) {
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

function InputKey(props: Props){
	const dataInput = useContext(DataStream);

	return (
		<input
			type="button"
			className="input-key"
			data-testid={"input-key-"+props.char}
			value={props.char}
			onClick={() => {
				dataInput.dataDispatch(CheckButtonType( props.char))
			}}
		/>
	);
}

export default InputKey
