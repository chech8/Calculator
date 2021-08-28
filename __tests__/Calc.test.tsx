import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Calc from '../containers/Calc';

afterEach(cleanup);


describe('Calc', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
          <Calc />,
          div);
    
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders empty display by default", () => {
        const { getByTestId } = render(
            <Calc />
        );

        expect(getByTestId("display-expression")).toBeEmptyDOMElement();
        expect(getByTestId("display-result")).toBeEmptyDOMElement();
    });

    it("updates display when character key is pressed", () => {
        const { getByTestId } = render(
            <Calc />
        );

        fireEvent.click(getByTestId("input-key-5"));

        expect(getByTestId("display-expression")).toHaveTextContent('5');
        expect(getByTestId("display-result")).toBeEmptyDOMElement();
    });

    it("updates display when multiple character keys are pressed", () => {
        const { getByTestId } = render(
            <Calc />
        );

        fireEvent.click(getByTestId("input-key-1"));
        fireEvent.click(getByTestId("input-key-2"));
        fireEvent.click(getByTestId("input-key-."));
        fireEvent.click(getByTestId("input-key-3"));
        fireEvent.click(getByTestId("input-key-4"));
        fireEvent.click(getByTestId("input-key-+"));
        fireEvent.click(getByTestId("input-key-5"));
        fireEvent.click(getByTestId("input-key-6"));
        fireEvent.click(getByTestId("input-key--"));
        fireEvent.click(getByTestId("input-key-7"));
        fireEvent.click(getByTestId("input-key-8"));
        fireEvent.click(getByTestId("input-key-*"));
        fireEvent.click(getByTestId("input-key-9"));
        fireEvent.click(getByTestId("input-key-0"));
        fireEvent.click(getByTestId("input-key-/"));

        expect(getByTestId("display-expression")).toHaveTextContent('12.34+56-78*90/');
        expect(getByTestId("display-result")).toBeEmptyDOMElement();
    });

    it("calculates result when '=' is pressed", () => {
        const { getByTestId } = render(
            <Calc />
        );

        fireEvent.click(getByTestId("input-key-5"));
        fireEvent.click(getByTestId("input-key-+"));
        fireEvent.click(getByTestId("input-key-6"));
        fireEvent.click(getByTestId("input-key-="));

        expect(getByTestId("display-expression")).toHaveTextContent('5+6');
        expect(getByTestId("display-result")).toHaveTextContent('11');
    });

    it("removes a character when 'Del' is pressed", () => {
        const { getByTestId } = render(
            <Calc />
        );

        fireEvent.click(getByTestId("input-key-5"));
        fireEvent.click(getByTestId("input-key-4"));
        fireEvent.click(getByTestId("input-key-6"));

        expect(getByTestId("display-expression")).toHaveTextContent('546');
        expect(getByTestId("display-result")).toBeEmptyDOMElement();

        fireEvent.click(getByTestId("input-key-Del"));

        expect(getByTestId("display-expression")).toHaveTextContent('54');
        expect(getByTestId("display-result")).toBeEmptyDOMElement();
    });

    it("clears the display when 'AC' is pressed", () => {
        const { getByTestId } = render(
            <Calc />
        );

        fireEvent.click(getByTestId("input-key-5"));
        fireEvent.click(getByTestId("input-key-+"));
        fireEvent.click(getByTestId("input-key-6"));
        fireEvent.click(getByTestId("input-key-="));

        expect(getByTestId("display-expression")).toHaveTextContent('5+6');
        expect(getByTestId("display-result")).toHaveTextContent('11');

        fireEvent.click(getByTestId("input-key-AC"));

        expect(getByTestId("display-expression")).toBeEmptyDOMElement();
        expect(getByTestId("display-result")).toBeEmptyDOMElement();
    });
});