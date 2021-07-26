
import React from 'react';

import Details from './Details/Details.jsx';
import Actions from '../Form/Actions/Actions.jsx';
import Edit from '../Form/Edit/Edit.jsx';
export class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            view: "details",
            form: {
                selectedTopics: [],
                author: props.data.author,
                title: props.data.title,
                description: props.data.description
            }
        }
    }
    static defaultProps = {
        data: {},
    }

    handleSubmission(data) {
        console.log("submission data", data)
        return
    }

    render() {
        const { data } = this.props
        const { view } = this.state

        switch (view) {
            default:
            case 'view':
                return <Details data={ data } changeView={(view) => this.setState({view})}/>
            case 'edit':
                return <Edit onReturn={() => this.setState({ view: "actions" })} data={data} onSubmit={(data) => this.handleSubmission(data)}/>
            case 'actions':
                return <Actions onReturn={() => this.setState({ view: "details" })} onActionSelect={(action) => this.setState({ view: action })} />

        }
    }
}

export default Form;