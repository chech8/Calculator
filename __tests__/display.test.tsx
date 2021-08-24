import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Display from '../components/Display';
import { DATATYPE, DataStream, DataStreamProvider } from '../contexts/DataStream';

afterEach(cleanup);


describe('Display', () => {
  it('renders without crashing', () => {
    const initState: DATATYPE = {
      expression: '',
      result: '',
    };

    const div = document.createElement("div");
    ReactDOM.render(
      <DataStreamProvider initState={initState}>
        <Display />
      </DataStreamProvider>,
      div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders initial state', () => {
    const initState: DATATYPE = {
      expression: '',
      result: '',
    };

    const { getByTestId } = render(
      <DataStreamProvider initState={initState}>
        <Display />
      </DataStreamProvider>
    );
    expect(getByTestId("display-expression")).toBeEmptyDOMElement();
    expect(getByTestId("display-result")).toBeEmptyDOMElement();
  });

  it('renders custom initial state', () => {
    const initState: DATATYPE = {
      expression: '2+2',
      result: '4',
    };

    const { getByTestId } = render(
      <DataStreamProvider initState={initState}>
        <Display />
      </DataStreamProvider>
    );
    expect(getByTestId("display-expression")).toHaveTextContent('2+2');
    expect(getByTestId("display-result")).toHaveTextContent('4');
  });

  it('renders updated state', () => {
    const initState: DATATYPE = {
      expression: '2+2',
      result: '',
    };

    const UpdateState = (() => {
      const dS = useContext(DataStream);
      return (
        <input
          type="button"
          data-testid="testButton"
          onClick={() => {
            dS.dataDispatch({
              type: "functional",
              input: '=',
            })
          }}
        />
      );
    });

    const { getByTestId } = render(
      <DataStreamProvider initState={initState}>
        <Display />
        <UpdateState />
      </DataStreamProvider>
    );
    expect(getByTestId("display-expression")).toHaveTextContent('2+2');
    expect(getByTestId("display-result")).toBeEmptyDOMElement();

    fireEvent.click(getByTestId('testButton'));

    expect(getByTestId("display-expression")).toHaveTextContent('2+2');
    expect(getByTestId("display-result")).toHaveTextContent('4');
  });
});