import React from 'react';
import Form from '../Form/Form.jsx';

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
        return axios.get('http://openlibrary.org/search.json?title=the+lord+of+the+rings')
            .then(function (response) {
                ref.setState({loading: false, data: ref.filterData(response.data.docs[0])})
            })
            .catch(function (error) {
                ref.setState({ loading: false, error })

            });
    }

    mapTopics(topics) {
        let output = [];
        for (let i = 0; i < topics.length; i++) {
            output.push({display: topics[i], value: i})
        }
        return output;
    }

    filterData(data) {
        return {
            author: data.author_name[0],
            title: data.title,
            availableTopics: this.mapTopics(data.subject),
            selectedTopics: [],
            description: data.text[2]
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