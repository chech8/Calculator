import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import KeyPad from '../containers/KeyPad';

afterEach(cleanup);


describe('KeyPad', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
          <KeyPad />,
          div);
    
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders all defined buttons', () => {
        /* When defining new buttons in the keyLayout, this test should be
        *  updated alongside it. Defined keyLayout since last update of
        *  this test:
        *  [['(', ')',  'Del', 'AC'],
        *  ['7',  '8',  '9',   '/'],
        *  ['4',  '5',  '6',   '*'],
        *  ['1',  '2',  '3',   '-'],
        *  ['0',  '.',  '=',   '+']]; */
        const { getByTestId } = render(
            <KeyPad />
        );
      
        // Row 1
        expect(getByTestId("input-key-(")).toHaveAccessibleName('(');
        expect(getByTestId("input-key-)")).toHaveAccessibleName(')');
        expect(getByTestId("input-key-Del")).toHaveAccessibleName('Del');
        expect(getByTestId("input-key-AC")).toHaveAccessibleName('AC');

        // Row 2
        expect(getByTestId("input-key-7")).toHaveAccessibleName('7');
        expect(getByTestId("input-key-8")).toHaveAccessibleName('8');
        expect(getByTestId("input-key-9")).toHaveAccessibleName('9');
        expect(getByTestId("input-key-/")).toHaveAccessibleName('/');

        // Row 3
        expect(getByTestId("input-key-4")).toHaveAccessibleName('4');
        expect(getByTestId("input-key-5")).toHaveAccessibleName('5');
        expect(getByTestId("input-key-6")).toHaveAccessibleName('6');
        expect(getByTestId("input-key-*")).toHaveAccessibleName('*');

        // Row 4
        expect(getByTestId("input-key-1")).toHaveAccessibleName('1');
        expect(getByTestId("input-key-2")).toHaveAccessibleName('2');
        expect(getByTestId("input-key-3")).toHaveAccessibleName('3');
        expect(getByTestId("input-key--")).toHaveAccessibleName('-');

        // Row 5
        expect(getByTestId("input-key-0")).toHaveAccessibleName('0');
        expect(getByTestId("input-key-.")).toHaveAccessibleName('.');
        expect(getByTestId("input-key-=")).toHaveAccessibleName('=');
        expect(getByTestId("input-key-+")).toHaveAccessibleName('+');
    });
});