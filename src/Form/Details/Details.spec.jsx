import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, configure } from "enzyme";

import Details from "./Details.jsx";

configure({ adapter: new Adapter() });

const DUMMY_DATA = {
    author: "George Orwell",
    title: "Nineteen Eighty-Four",
    selectedTopics: [{ display: "Nationalism", value: 0 }],
    selectedPlace: [{ display: "England", value: 0 }],
    description: "The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.",
    availablePlaces: [{ display: "England", value: 0 }, { display: "London", value: 1 }, { display: "Oceania", value: 2 }, { display: "Eastasia", value: 3 }],
    availableTopics: [{ display: "Nationalism", value: 0 }, { display: "Censorship", value: 1 }, { display: "Thoughtcrime", value: 2 }, { display: "Newspeak", value: 3 },]
};

describe("The Details component", () => {
    describe("the render method", () => {
        it("should render a PropertyView component for each label", () => {
            const labels = ["Title", "Author", "Description", "Subjects", "Places"];
            let component = shallow(<Details data={DUMMY_DATA}/>);
            let foundPropertyViews = 0;
            for (let i = 0; i < labels.length; i++) {
                let found = component.findWhere(el => el.prop('label') === labels[i]);
                foundPropertyViews = foundPropertyViews + found.length;
            }
            chai.expect(foundPropertyViews).to.equal(labels.length);
        });

        it("Should render a list of display strings in the topics and places when there are values", () => {
            let component = shallow(<Details data={DUMMY_DATA} />);
            let selectedTopics = component.findWhere(el => el.prop('label') === "Subjects");
            let selectedPlace = component.findWhere(el => el.prop('label') === "Places");
            chai.expect(selectedTopics.prop('value')[0]).to.equal('Nationalism, ');
            chai.expect(selectedPlace.prop('value')[0]).to.equal('England, ');
        });

        it("Should render a 'None Selected' in the topics and places when there are no values", () => {
            let data = {...DUMMY_DATA};
            data.selectedTopics = [];
            data.selectedPlace = [];
            let component = shallow(<Details data={data} />);
            let selectedTopics = component.findWhere(el => el.prop('label') === "Subjects");
            let selectedPlace = component.findWhere(el => el.prop('label') === "Places");
            chai.expect(selectedTopics.prop('value')).to.equal('None Selected');
            chai.expect(selectedPlace.prop('value')).to.equal('None Selected');
        });
    });

    describe("The onClick methods", () => {
        it("Should call changeView from props when clicking on the Navigator component", () => {
            let spy = sinon.spy();
            let component = shallow(<Details data={DUMMY_DATA} changeView={spy} />);
            component.find('Navigator').simulate('click');
            chai.expect(spy.called).to.equal(true);
            chai.expect(spy.args[0][0]).to.equal('actions');
        });
    });
});