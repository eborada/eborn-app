import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import Edit from "./Edit.jsx";

configure({ adapter: new Adapter() });

const DUMMY_FORM = {
    author: "George Orwell",
    title: "Nineteen Eighty-Four",
    description: "The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.",
    selectedTopics: [{ display: "Nationalism", value: 0 }],
    selectedPlace: [{ display: "England", value: 0 }]
};

const PLACES = [{ display: "England", value: 0 }, { display: "London", value: 1 }, { display: "Oceania", value: 2 }, { display: "Eastasia", value: 3 }]
const TOPICS = [{ display: "Nationalism", value: 0 }, { display: "Censorship", value: 1 }, { display: "Thoughtcrime", value: 2 }, { display: "Newspeak", value: 3 }]
const BASE_PROPS = {
    form: DUMMY_FORM,
    availablePlaces: PLACES,
    availableTopics:TOPICS
};

describe("The Edit component", () => {
    describe("the edit mode", () => {
        it("Should render edit mode by default", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal("Edit Details");
        });

        it("Should render the submit Navigator when all mandatory fields are populated in state", () => {
            let component = shallow(<Edit {...BASE_PROPS} mandatory={["title", "author", "description","selectedTopics", "selectedPlace"]} />);
            let submit = component.findWhere(el => el.prop("mode") === "submit");
            chai.expect(submit).to.have.lengthOf(1); 
        });

        it("Should NOT render the submit Navigator if a mandatory field is empty", () => {
            const props = {...BASE_PROPS};
            props.form.title = ""
            let component = shallow(<Edit {...props} mandatory={["title", "author", "description", "selectedTopics", "selectedPlace"]} />);
            let submit = component.findWhere(el => el.prop("mode") === "submit");
            chai.expect(submit).to.have.lengthOf(0);
        });

        it("Should render a list of display strings in the topics and places when there are values", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            let selectedTopics = component.findWhere(el => el.prop('label') === "Subjects");
            let selectedPlace = component.findWhere(el => el.prop('label') === "Places");
            chai.expect(selectedTopics.prop('value')[0]).to.equal('Nationalism, ');
            chai.expect(selectedPlace.prop('value')[0]).to.equal('England, ');
        });

        it("Should render a 'None Selected' in the topics and places when there are no values", () => {
            let props = { ...BASE_PROPS };
            props.form.selectedTopics = [];
            props.form.selectedPlace = [];
            let component = shallow(<Edit {...props} />);
            let selectedTopics = component.findWhere(el => el.prop('label') === "Subjects");
            let selectedPlace = component.findWhere(el => el.prop('label') === "Places");
            chai.expect(selectedTopics.prop('value')).to.equal('None Selected');
            chai.expect(selectedPlace.prop('value')).to.equal('None Selected');
        });

        it("Should call onReturn from props when clicking the back Navigator", () => {
            let spy = sinon.spy();
            let component = shallow(<Edit {...BASE_PROPS} onReturn={spy}/>);
            component.findWhere(el => el.prop("mode") === "back").simulate("click");
            chai.expect(spy.called).to.equal(true);
        });

        it("Should call onSubmit from props when clicking the submit Navigator", () => {
            let spy = sinon.spy();
            let component = shallow(<Edit {...BASE_PROPS} onSubmit={spy} />);
            let expectedArgument = {
                author: 'George Orwell',
                title: '',
                description: 'The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.',
                selectedTopics: [],
                selectedPlace: []
            };
            component.findWhere(el => el.prop("mode") === "submit").simulate("click");
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.deep.equal(expectedArgument);
        });

        it("Should call handleUpdate when updating the title", () => {
            let spy = sinon.spy(Edit.prototype, "handleUpdate");
            let event = {target: {value: "New Title", name: "title"}};
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Title").dive().find('input').simulate('change', event);
            spy.restore();
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.deep.equal(event);
        });

        it("Should call handleUpdate when updating the author", () => {
            let spy = sinon.spy(Edit.prototype, "handleUpdate");
            let event = { target: { value: "New Title", name: "title" } };
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Title").dive().find('input').simulate('change', event);
            spy.restore();
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.deep.equal(event);
        });

        it("Should change view to textarea when clicking the description", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Description").simulate('click');
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal('Edit Description');
        });

        it("Should change view to PropertyEdit when clicking the Subjects", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Subjects").simulate('click');
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal('Edit Subjects');
        });

        it("Should change view to PropertyEdit when clicking the Places", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Places").simulate('click');
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal('Edit Location');
        });
    });

    describe("The edit-text-mode", () => {
        it("Should return to edit mode when clicking on Navigator", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Description").simulate('click');
            component.findWhere(el => el.prop("mode") === "back").simulate("click");
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal('Edit Details');
        });

        it("Should call handleUpdate when updating the description", () => {
            let spy = sinon.spy(Edit.prototype, "handleUpdate");
            let event = { target: { value: "New Description", name: "description" } };
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Description").simulate('click');
            component.findWhere(el => el.prop('name') === "description").dive().find('textarea').simulate('change', event);
            spy.restore();
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.deep.equal(event);
        });
    });

    describe("The subject selection", () => {
        it("Should return to edit mode when clicking on Navigator", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Subjects").simulate('click');
            component.findWhere(el => el.prop("mode") === "back").simulate("click");
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal('Edit Details');
        });

        it("Should render a PropertyEdit for every object in the availableTopics array", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Subjects").simulate('click');
            let topicProperties = component.find('PropertyEdit');
            chai.expect(topicProperties.length).to.equal(BASE_PROPS.availableTopics.length);
        });

        it("Should call handleMultiSelect when a Property option is clicked", () => {
            let spy = sinon.spy(Edit.prototype, "handleMultiSelect");
            let event = { target: { value: "3" } };
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Subjects").simulate('click');
            component.find('PropertyEdit').at(0).dive().find('input').simulate('change', event);
            spy.restore();
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.equal(3);
        });
    });

    describe("The location selection", () => {
        it("Should return to edit mode when clicking on Navigator", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Places").simulate('click');
            component.findWhere(el => el.prop("mode") === "back").simulate("click");
            let title = component.find('Title').prop('value');
            chai.expect(title).to.equal('Edit Details');
        });

        it("Should render a PropertyEdit for every object in the availablePlaces array", () => {
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Places").simulate('click');
            let locationProperties = component.find('PropertyEdit');
            chai.expect(locationProperties.length).to.equal(BASE_PROPS.availablePlaces.length);
        });

        it("Should call handleSingleSelect when a Property option is clicked", () => {
            let spy = sinon.spy(Edit.prototype, "handleSingleSelect");
            let event = { target: { value: "3" } };
            let component = shallow(<Edit {...BASE_PROPS} />);
            component.findWhere(el => el.prop('label') === "Places").simulate('click');
            component.find('PropertyEdit').at(0).dive().find('input').simulate('change', event);
            spy.restore();
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.equal(3);
        });
    });
});