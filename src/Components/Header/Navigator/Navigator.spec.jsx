import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import Navigator from "./Navigator.jsx";

configure({ adapter: new Adapter() });

describe("Navigator component", () => {
    it("Should render the correct value from value prop", () => {
        let mode = "submit";
        let component = shallow(<Navigator mode={mode} />);
        let output = component.find('span').text();
        expect(output).toBe(mode);
    });

    it('Should call the onClick from props when called', () => {
        let spy = sinon.spy();
        let component = shallow(<Navigator onClick={spy} mode="submit" />);
        component.find('div').simulate('click');
        expect(spy.called).toBe(true);
    });
});