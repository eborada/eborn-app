import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import { shallow, configure } from "enzyme";

import Application from "./Application.jsx";

configure({ adapter: new Adapter() });

const DUMMY_DATA = {
    author: "George Orwell",
    title: "Nineteen Eighty-Four",
    description: "The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.",
    availablePlaces: [{ display: "England", value: 0 }, { display: "London", value: 1 }, { display: "Oceania", value: 2 }, { display: "Eastasia", value: 3 }],
    availableTopics: [{ display: "Nationalism", value: 0 }, { display: "Censorship", value: 1 }, { display: "Thoughtcrime", value: 2 }, { display: "Newspeak", value: 3 },]
};

describe("The application component", () => {
    describe("the componentDidMount method", () => {
       it("should initally have a loading title", () => {
           let component = shallow(<Application />);
           let output = component.find("h1").text();
           chai.expect(output).to.equal("DATA FETCHING NOW");
       });

       it("Should render the Form component after the data is loaded", () => {
           let component = shallow(<Application />);
           component.setState({view: "form", data: DUMMY_DATA});
           let output = component.find('Form');
           chai.expect(output.length).to.equal(1);
       });
    });

    describe("The filterData method", () => {
        let data = {author_name: ["George Orwell"], title: "Nineteen Eighty-Four", subject: ["Nationalism", "Censorship"], text: ["Zero", "One", "Two"], place: ["Oceania", "Eurasia"]}
        it("Should return an object with relevant keys", () => {
            let component = shallow(<Application />).instance();
            let output = component.filterData(data);
            let expectedOutput = {
                author: 'George Orwell',
                title: 'Nineteen Eighty-Four',
                availableTopics: [
                    { display: 'Nationalism', value: 0 },
                    { display: 'Censorship', value: 1 }
                ],
                selectedTopics: [],
                description: 'Two',
                availablePlaces: [
                    { display: 'Oceania', value: 0 },
                    { display: 'Eurasia', value: 1 }
                ],
                selectedPlace: []
            }
            chai.expect(output).to.deep.equal(expectedOutput);
        });
    });

    describe("The mapArray method", () => {
        it("Should take an array of strings and map them into a object with display / value properties", () => {
            let exampleData = ["Zero", "One", "Two"];
            let expectedOutput = [{ display: "Zero", value: 0 }, { display: "One", value: 1 }, { display: "Two", value: 2 }];
            let component = shallow(<Application />).instance();
            let output = component.mapArray(exampleData);
            chai.expect(output).to.deep.equal(expectedOutput);
        });
    });
});