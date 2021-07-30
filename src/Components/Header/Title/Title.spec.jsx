import 'jsdom-global/register';
import React from 'React';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import expect from 'expect';
import {shallow, configure} from "enzyme";

import Title from "./Title.jsx";

configure({ adapter: new Adapter() });

describe("Title component", () => {
    it("should render the correct title from value prop", () => {
        let title = "Hello World"
        let component = shallow(<Title value={title} />)
        let output = component.find('span').text();
        expect(output).toBe(title);
    });
});