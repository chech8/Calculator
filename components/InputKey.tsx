function InputKey(props){
	return <input
		type="button"
		className="input-key"
		label={props.char}
		value={props.char}
		onClick={() => props.setData(1)}
	/>;
}

export default InputKey
