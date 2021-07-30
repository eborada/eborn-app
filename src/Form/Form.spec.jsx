import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import Form from "./Form.jsx";

configure({ adapter: new Adapter() });

const DUMMY_DATA = {
    author: "George Orwell",
    title: "Nineteen Eighty-Four",
    description: "The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.",
    selectedTopics: [{ display: "Nationalism", value: 0 }],
    selectedPlace: [{ display: "England", value: 0 }]
};
const availablePlaces = [{ display: "England", value: 0 }, { display: "London", value: 1 }, { display: "Oceania", value: 2 }, { display: "Eastasia", value: 3 }]
const availableTopics = [{ display: "Nationalism", value: 0 }, { display: "Censorship", value: 1 }, { display: "Thoughtcrime", value: 2 }, { display: "Newspeak", value: 3 }]

describe("The Form component", () => {
    describe("The render method", () => {
        it("should initally render the details panel", () => {
            let component = shallow(<Form data={DUMMY_DATA}/>);
            let output = component.find("Details")
            chai.expect(output).to.have.lengthOf(1);
        });

        it("Should render the Edit component when the state view is edit", () => {
            let component = shallow(<Form data={DUMMY_DATA} />);
            component.setState({ view: "edit"});
            let output = component.find('Edit');
            chai.expect(output.length).to.equal(1);
        });

        it("Should render the Actions component when the state view is actions", () => {
            let component = shallow(<Form data={DUMMY_DATA} />);
            component.setState({ view: "actions" });
            let output = component.find('Actions');
            chai.expect(output.length).to.equal(1);
        });
    });

    describe("The handleSubmission method", () => {
        it("Should call handleSubmission from props with availablePlaces and avaialbeTopics in the argument obj", () => {
            let expectedOutput = { ...DUMMY_DATA, availablePlaces, availableTopics};
            let spy = sinon.spy();
            let component = shallow(<Form data={expectedOutput} handleSubmission={spy}/>).instance();
            component.handleSubmission(DUMMY_DATA);
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.deep.equal(expectedOutput);
        });
    });
});