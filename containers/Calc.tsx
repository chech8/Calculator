import { useState } from "react"
import Display from '../components/Display.tsx'
import KeyPad from '../containers/KeyPad.tsx'

function Calc(props){
	const [data, setData] = useState(null);

	return (
		<div className="calculator">
			<Display data={data} />
			<KeyPad setData={setData} />
		</div>
	);
}

export default Calc
