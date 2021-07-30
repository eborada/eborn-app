import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import PropertyEdit from "./PropertyEdit.jsx";

configure({ adapter: new Adapter() });

describe("PropertyEdit component", () => {
    describe("data mode", () => {
        let props = { mode: "data", label: "I am label", value: "I am value", name: "title", onUpdate: (e) => {e}};

        it("should render the correct data from props", () => {
            let component = shallow(<PropertyEdit {...props} />);
            let input = component.find('input').prop('name');
            let label = component.find('label').text();
            expect(input).toBe(props.name);
            expect(label).toBe(props.label);
        });

        it("Should pass an event with the correct data to props.onUpdate", () => {
            props.onUpdate = sinon.spy();
            let update = { target: { value: "Demo text " } };
            let component = shallow(<PropertyEdit {...props} />);
            let input = component.find('input');
            input.simulate('change', update );
            expect(props.onUpdate.called).toBe(true);
            expect(props.onUpdate.args[0][0]).toBe(update);
        });
    });

    describe("select-option mode", () => {
        let props = { mode: "select-option", label: "I am label", value: 2, onSelect: (e) => { e }, selectedData: [{ display: "Selected One", value: 0 }, { display: "Selected Two", value: 2 }]};
        it("should render the correct data from props", () => {
            let component = shallow(<PropertyEdit {...props} />);
            let input = component.find('input');
            expect(input.prop('checked')).toBe(true);
            expect(input.prop('name')).toBe(props.label);
            expect(input.prop('value')).toBe(props.value);
        });

        it("Should pass an event with the correct data to props.onUpdate", () => {
            props.onSelect = sinon.spy();
            let update = { target: { value: "3" } };
            let component = shallow(<PropertyEdit {...props} />);
            let input = component.find('input');
            input.simulate('change', update);
            expect(props.onSelect.called).toBe(true);
            expect(props.onSelect.args[0][0]).toBe(Number(update.target.value));
        });
    });
});