import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import InputKey from '../components/InputKey';
import { DATATYPE, DataStream, DataStreamProvider } from '../contexts/DataStream';

afterEach(cleanup);


const ShowState = (() => {
    const dS = useContext(DataStream);
    return (
        <div>
            <div
                data-testid="showStateExpression"
            >
                {dS.dataState.expression}
            </div>
            <div
                data-testid="showStateResult"
            >
                {dS.dataState.result}
            </div>
        </div>
    );
});


describe('InputKey', () => {
    it('renders without crashing', () => {
      const initState: DATATYPE = {
        expression: '',
        result: '',
      };
  
      const div = document.createElement("div");
      ReactDOM.render(
        <DataStreamProvider initState={initState}>
          <InputKey char='' />
        </DataStreamProvider>,
        div);
  
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correct string', () => {
        const initState: DATATYPE = {
          expression: '',
          result: '',
        };
    
        const { getByText } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="1=r" />
          </DataStreamProvider>
        );

        expect(getByText("1=r"));
    });

    it('appends the state with character', () => {
        const initState: DATATYPE = {
          expression: '',
          result: '',
        };
    
        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="42" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-42")).toHaveAccessibleName('42');
        expect(getByTestId("showStateExpression")).toBeEmptyDOMElement();
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();

        fireEvent.click(getByTestId("input-key-42"));

        expect(getByTestId("showStateExpression")).toHaveTextContent('42');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();
    });

    it('update state with character', () => {
        const initState: DATATYPE = {
          expression: '',
          result: '',
        };
    
        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="42" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-42")).toHaveAccessibleName('42');
        expect(getByTestId("showStateExpression")).toBeEmptyDOMElement();
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();

        fireEvent.click(getByTestId("input-key-42"));

        expect(getByTestId("showStateExpression")).toHaveTextContent('42');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();
    });

    it('appends the state to the existing text', () => {
        const initState: DATATYPE = {
          expression: '34*6+2',
          result: '',
        };

        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="/" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-/")).toHaveAccessibleName('/');
        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+2');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();

        fireEvent.click(getByTestId("input-key-/"));

        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+2/');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();
    });

    it('performs function Equal', () => {
        const initState: DATATYPE = {
          expression: '34*6+2',
          result: '',
        };

        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="=" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-=")).toHaveAccessibleName('=');
        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+2');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();

        fireEvent.click(getByTestId("input-key-="));

        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+2');
        expect(getByTestId("showStateResult")).toHaveTextContent('206');
    });

    it('performs function All Clear', () => {
        const initState: DATATYPE = {
          expression: '34*6+2',
          result: '206',
        };

        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="AC" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-AC")).toHaveAccessibleName('AC');
        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+2');
        expect(getByTestId("showStateResult")).toHaveTextContent('206');

        fireEvent.click(getByTestId("input-key-AC"));

        expect(getByTestId("showStateExpression")).toBeEmptyDOMElement();
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();
    });

    it('performs function Delete', () => {
        const initState: DATATYPE = {
          expression: '34*6+2',
          result: '206',
        };

        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="Del" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-Del")).toHaveAccessibleName('Del');
        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+2');
        expect(getByTestId("showStateResult")).toHaveTextContent('206');

        fireEvent.click(getByTestId("input-key-Del"));

        expect(getByTestId("showStateExpression")).toHaveTextContent('34*6+');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();
    });

    it('display SyntaxError', () => {
        const initState: DATATYPE = {
          expression: '56+*4',
          result: '',
        };
    
        const { getByTestId } = render(
          <DataStreamProvider initState={initState}>
            <InputKey char="=" />
            <ShowState />
          </DataStreamProvider>
        );

        expect(getByTestId("input-key-=")).toHaveAccessibleName('=');
        expect(getByTestId("showStateExpression")).toHaveTextContent('56+*4');
        expect(getByTestId("showStateResult")).toBeEmptyDOMElement();

        fireEvent.click(getByTestId("input-key-="));

        expect(getByTestId("showStateExpression")).toHaveTextContent('56+*4');
        expect(getByTestId("showStateResult")).toHaveTextContent('SyntaxError');
    });
});