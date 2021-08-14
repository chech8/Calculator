function InputKey(props){
	return <input
		type="button"
		className="input-key"
		label={props.char}
		value={props.char}
	/>;
}

export default InputKey
