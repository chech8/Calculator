import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
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


describe('DataStreamProvider Errors', () => {
  const realError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = realError;
  });

  it('receives unknown function key', () => {
    const initState: DATATYPE = {
      expression: '',
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
              input: "incorrectInput",
            })
          }}
        />
      );
    });

    const { getByTestId } = render(
      <DataStreamProvider initState={initState}>
        <ShowState />
        <UpdateState />
      </DataStreamProvider>
    );

    expect(getByTestId("showStateExpression")).toBeEmptyDOMElement();
    expect(getByTestId("showStateResult")).toBeEmptyDOMElement();

    fireEvent.click(getByTestId('testButton'));

    expect(getByTestId("showStateExpression")).toBeEmptyDOMElement();
    expect(getByTestId("showStateResult")).toBeEmptyDOMElement();
  });

  it('receives incorrect action.type request', () => {
    const initState: DATATYPE = {
      expression: '',
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
              type: "incorrectType",
              input: "incorrectInput",
            })
          }}
        />
      );
    });

    const { getByTestId } = render(
      <DataStreamProvider initState={initState}>
        <ShowState />
        <UpdateState />
      </DataStreamProvider>
    );

    expect(() => fireEvent.click(getByTestId('testButton'))).toThrow(
      "Incorrect action type."
    );
  });
});