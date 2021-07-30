import React from 'react';

import Form from '../Form/Form.jsx';
import { DISPLAY_KEY, VALUE_KEY } from '../constants.js';

import './Application.css';


const axios = require('axios').default;
export class Application extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            view: "loading"
        }
    }

    componentDidMount() {
        let ref = this;
        return axios.get('http://openlibrary.org/search.json?title=nineteen-eighty-four')
            .then(function (response) {
                ref.setState({view: "form", data: ref.filterData(response.data.docs[0])})
            })
            .catch(function (error) {
                ref.setState({ view: "form", error })
            });
    }

    handleSubmission(payload) {
        let ref = this;
        return axios.post('http://mock/post/api')
            .then(function (response) {
                ref.setState({ view: "submission", data: payload })
            })
            .catch(function (error) {
                ref.setState({ view: "submission", data: payload })
            });
    }

    mapArray(array) {
        let output = [];
        for (let i = 0; i < array.length; i++) {
            output.push({[DISPLAY_KEY]: array[i], [VALUE_KEY]: i})
        }
        return output;
    }

    filterData(data) {
        return {
            author: data.author_name[0],
            title: data.title,
            availableTopics: this.mapArray(data.subject),
            selectedTopics: [],
            description: data.text[2],
            availablePlaces: this.mapArray(data.place),
            selectedPlace: []
        }
    }

    render() {
        const { data, view } = this.state;
        switch(view){
            default:
            case "loading":
                return (
                    <div className="message">
                        <h1>DATA FETCHING NOW</h1>
                    </div>
                )
            case "form":
                return <Form data={data} handleSubmission={(data) => this.handleSubmission(data)} />
            case "submission":
                return (
                    <div className="message">
                        <h1>SUBMISSION SUCCESSFUL</h1>
                        <div onClick={() => this.setState({view: "form"})}><h3>Return To Form</h3></div>
                    </div>
                )
        }
    }
}

export default Application;