import React from 'react';
import Form from '../Form/Form.jsx';

import { DISPLAY_KEY, VALUE_KEY } from '../constants.js';

import './Application.css';

const axios = require('axios').default;

export class Application extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        let ref = this;
        return axios.get('http://openlibrary.org/search.json?title=nineteen-eighty-four')
            .then(function (response) {
                ref.setState({loading: false, data: ref.filterData(response.data.docs[0])})
            })
            .catch(function (error) {
                ref.setState({ loading: false, error })

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
            selectedPlace: {}
        }
    }

    render() {
        const { data, loading } = this.state;
        if (loading) {
            return (
                <div id="loading">
                    <h1>DATA FETCHING NOW</h1>
                </div>
            )
        }
        else {
            return (
                <Form data={ data } />
            )
        }

    }
}

export default Application;