import { useContext, useEffect, useState } from 'react';
import DataStream from '../contexts/DataStream';

function RunLastOperation(lastOperand: string, arg1: number, arg2: number){
	let output: number;

	switch (lastOperand) {
		case '+':
			output = arg1 + arg2;
			break;
		case '-':
			output = arg1 - arg2;
			break;
		case '*':
			output = arg1 * arg2;
			break;
		case '/':
			output = arg1 / arg2;
			break;
		case '':
			output = arg2;
			break;
		default:
			output = arg1;
			break;
	}
	console.log(output);
	return output;
}

function Display(props){
	const dataInput = useContext(DataStream);
	const [dataString, setDataString] = useState('');
	const [result, setResult] = useState(0);
	const [buffer, setBuffer] = useState('');
	const [lastOperation, setLastOperation] = useState('')

	useEffect(() => {
		if (dataInput.dataState.updateRequest) {
			let temp = dataInput.dataState.data;
			let calcTemp: number;

			if (typeof temp === 'number') {
				setBuffer(buffer.concat(temp as string));
				setDataString(dataString.concat(temp as string));
			}
			else {
				switch (temp) {
					case '+':
					case '-':
					case '*':
					case '/':
						setResult(RunLastOperation(lastOperation, result, parseFloat(buffer)));
						setBuffer('');
						setLastOperation(temp);
						console.log(lastOperation);
						setDataString(dataString => dataString.concat(temp));
						break;

					case 'AC':
						setDataString('');
						setResult(0);
						setBuffer('');
						setLastOperation('');
						break;

					case 'Del':
						setDataString(dataString.slice(0, -1));
						break;

					case '.':
						setBuffer(buffer.concat(temp));
						setDataString(dataString.concat(temp));
						break;

					case '=':
						calcTemp = RunLastOperation(lastOperation, result, parseFloat(buffer));
						setResult(calcTemp);
						setDataString(String(calcTemp));
						setBuffer(String(calcTemp));
						setLastOperation('');
						break;

					default:
						break;
				}
			}

			dataInput.dataDispatch({type: "clearRequest"});
			// console.log('2' as number);
			// console.log(lastOperation)
			// console.log(buffer);
			// console.log(result);
		}
	});

	return <div className="display">{dataString}</div>;
}

export default Display
