import { createContext, useReducer, ReactNode } from 'react';
import { evaluate, round } from 'mathjs';

type DATASTREAMTYPE = {
    dataState: {
        expression: string,
        result: string,
    }
    dataDispatch: (arg0: { type: string; input: string; }) => void,
};

export type DATATYPE = {
	expression: string,
	result: string,
};

type ACTIONTYPE =
  | { type: "character"; input: string }
  | { type: "functional"; input: string };

type Props = {
    children: ReactNode;
	initState: DATATYPE;
};


// Handles functional buttons
function PerformButtonFunction(input: string, prevDataState: DATATYPE){
	let output = prevDataState;
	let temp
	switch (input) {
		case "=":
			try {
				temp = round(evaluate(prevDataState.expression), 10) as string;
			}
			catch (error) {
				temp = error.name;
			}
			output = {
				expression: prevDataState.expression,
				result: temp,
			}
			break;

		case "AC":
			output = {
				expression: '',
				result: '',
			}
			break;

		case "Del":
			output = {
				expression: prevDataState.expression.slice(0, -1),
				result: '',
			} 
			break;

		default:
			break;
	}

	return output;
}

// Updates the dataStream according to the type of the button clicked
function dataStreamReducer(state: DATATYPE, action: any) {
	let output: DATATYPE;
	switch (action.type) {
		case "character":
			output = {
				expression: state.expression.concat(action.input),
				result: state.result,
			};
			return output;

		case "functional":
			 output = PerformButtonFunction(action.input, state);
			 return output;

		default:
			throw new Error();
	}
}

const DataStream = createContext<DATASTREAMTYPE>({} as DATASTREAMTYPE);

function DataStreamProvider(props: Props) {
    let [dataState, dataDispatch] = useReducer(dataStreamReducer, props.initState);

	const dataValue = {dataState, dataDispatch};

    return (
      <DataStream.Provider value={dataValue}>{props.children}</DataStream.Provider>
    );
  }

  let DataStreamConsumer = DataStream.Consumer;

export { DataStream, DataStreamProvider, DataStreamConsumer }
