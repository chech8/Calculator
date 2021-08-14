import Display from '../components/Display.tsx'
import KeyPad from '../containers/KeyPad.tsx'

function Calc(props){
	return (
		<div>
			<Display />
			<KeyPad />
		</div>
	);
}

export default Calc
