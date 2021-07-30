import React from 'react';

import Actions from '../Form/Actions/Actions.jsx';
import Details from './Details/Details.jsx';
import Edit from '../Form/Edit/Edit.jsx';
export class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            view: "details",
            form: {
                selectedTopics: props.data.selectedTopics,
                author: props.data.author,
                title: props.data.title,
                description: props.data.description,
                selectedPlace: props.data.selectedPlace
            }
        }
    }

    static defaultProps = {
        data: {},
    }

    handleSubmission(data) {
        data.availablePlaces = this.props.data.availablePlaces;
        data.availableTopics = this.props.data.availableTopics;
        this.props.handleSubmission(data);
    }

    render() {
        const { data } = this.props;
        const { availablePlaces, availableTopics } = data;
        const { view, form } = this.state;

        switch (view) {
            default:
            case 'view':
                return <Details data={ form } changeView={ view => this.setState({view}) } />
            case 'edit':
                return (
                    <Edit
                        mandatory={["title", "author", "description", "selectedTopics", "selectedPlace"]}
                        onReturn={ () => this.setState({ view: "actions" }) } 
                        form={ form } 
                        availablePlaces={ availablePlaces }
                        availableTopics={ availableTopics }
                        onSubmit={ data => this.handleSubmission(data) } 
                    />
                )
            case 'actions':
                return <Actions onReturn={ () => this.setState({ view: "details" }) } onActionSelect={ action => this.setState({ view: action }) } />
        }
    }
}

export default Form;