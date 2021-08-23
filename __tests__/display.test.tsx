import {useReducer} from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import Display from '../components/Display';
import { DataStreamProvider } from '../contexts/DataStream';

afterEach(cleanup);


describe('Display', () => {
  it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <DataStreamProvider>
        <Display />
      </DataStreamProvider>,
      div);

    ReactDOM.unmountComponentAtNode(div);
  });
});