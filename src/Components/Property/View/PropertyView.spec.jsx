import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import PropertyView from "./PropertyView.jsx";

configure({ adapter: new Adapter() });

describe("PropertyView component", () => {
    describe("data mode", () => {
        let props = { mode: "data",label: "I am label", value: "I am value" };
        
        it('Should call the onClick from props when called', () => {
            let spy = sinon.spy();
            let component = shallow(<PropertyView onClick={spy} {...props} />);
            component.find('div').simulate('click');
            expect(spy.called).toBe(true);
        });

        it("should render the correct data from props", () => {
            let component = shallow(<PropertyView {...props} />);
            let label = component.find('label').text();
            let span = component.find('span').text();
            expect(label).toBe(props.label);
            expect(span).toBe(props.value);
        });
    });

    describe("menu-option mode", () => {
        let props = { mode: "menu-option", label: "I am label" };
        
        it('Should call the onClick from props when called', () => {
            let spy = sinon.spy();
            let component = shallow(<PropertyView onClick={spy} {...props} />);
            component.find('div').simulate('click');
            expect(spy.called).toBe(true);
        });

        it("should render the correct data from props", () => {
            let component = shallow(<PropertyView {...props} />);
            let label = component.find('span').text();
            expect(label).toBe(props.label);
        });
    });
});