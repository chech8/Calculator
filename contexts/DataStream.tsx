import { createContext } from 'react';


type DATASTREAMTYPE = {
    dataState: {
        expression: string,
        result: string,
    }
    dataDispatch: (arg0: { type: string; input: string; }) => void,
};


const DataStream = createContext<DATASTREAMTYPE>({} as DATASTREAMTYPE);

export default DataStream
