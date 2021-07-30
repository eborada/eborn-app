import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import Actions from "./Actions.jsx";

configure({ adapter: new Adapter() });

describe("The Actions component", () => {
    describe("the render method", () => {
        it("should render a PropertyView component for each action", () => {
            const labels = ["Edit Book Details"];
            let component = shallow(<Actions />);
            let foundPropertyViews = 0;
            for (let i = 0; i < labels.length; i++) {
                let found = component.findWhere(el => el.prop('label') === labels[i]);
                foundPropertyViews = foundPropertyViews + found.length;
            }
            chai.expect(foundPropertyViews).to.equal(labels.length);
        });
    });

    describe("The onClick methods", () => {
        it("Should call onActionSelect from props when clicking on the PropertyView component", () => {
            let spy = sinon.spy();
            let component = shallow(<Actions onActionSelect={spy} />);
            component.find('PropertyView').simulate('click');
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.equal('edit');
        });

        it("Should call onActionSelect from props when clicking on the PropertyView component", () => {
            let spy = sinon.spy();
            let component = shallow(<Actions onReturn={spy} />);
            component.find('Navigator').simulate('click');
            chai.expect(spy.called).to.equal(true);
        });
    });
});