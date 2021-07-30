import React from 'react';

import Header from '../../Components/Header/Header.jsx';
import Navigator from '../../Components/Header/Navigator/Navigator.jsx';
import PropertyView from '../../Components/Property/View/PropertyView.jsx';
import PropertyEdit from '../../Components/Property/Edit/PropertyEdit.jsx';
import TextBox from '../../Components/TextBox/TextBox.jsx';
import Title from '../../Components/Header/Title/Title.jsx';

import { DISPLAY_KEY, VALUE_KEY } from '../../constants.js';

export class Edit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                author: props.form.author,
                title: props.form.title,
                description: props.form.description,
                selectedTopics: props.form.selectedTopics,
                selectedPlace: props.form.selectedPlace,
            },
            view: "edit"
        }
    }

    static defaultProps = {
        form: {},
        availableTopics: [],
        availablePlaces: [],
        mandatory: [],
        onReturn: () => {},
        onSubmit: () => {}
    }

    handleUpdate(e) {
        const { form } = this.state;
        const { name, value } = e.target; 
        this.setState({ form: { ...form, [name]: value }});
    }

    selectionLookup(selection, arr = "places") {
        const { availablePlaces, availableTopics } = this.props;
        let array = arr === "topics" ? availableTopics : availablePlaces;
        return array.find(obj => obj[VALUE_KEY] === selection);
    }

    handleMultiSelect(value) {
        const { form } = this.state;
        let { selectedTopics = [] } = form;
        const selectedObject = this.selectionLookup(value, "topics");
        
        if (selectedTopics.length === 0) selectedTopics.push(selectedObject);
        else {
            let idx = -1;
            for (let i = 0; i < selectedTopics.length; i++) {
                if (selectedTopics[i][VALUE_KEY] === selectedObject[VALUE_KEY]) {
                    idx = i;
                }
            }
            idx > -1 ? selectedTopics.splice(idx, 1) : selectedTopics.push(selectedObject)
        }
        return this.setState({ form: { ...form, selectedTopics } })
    }

    handleSingleSelect(value) {
        const { form } = this.state;
        const selectedPlace = [this.selectionLookup(value, "places")];
        return this.setState({ form: { ...form, selectedPlace }, view: "edit"});
    }

    determineSubmitable() {
        const { mandatory = [] } = this.props;
        const { form } = this.state;
        for (let i = 0; i < mandatory.length; i++) {
            if (!form[mandatory[i]].length) return false;
        }
        return true;
    }

    render() {
        const { form, view } = this.state;
        const { availableTopics, availablePlaces } = this.props;
        const { title, author, description, selectedTopics, selectedPlace } = form;
        let submitable = this.determineSubmitable();

        switch(view) {
            case "edit":
                return (
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={ () => this.props.onReturn() } />
                            <Title value="Edit Details" />
                            { submitable ? <Navigator onClick={ () => this.props.onSubmit(form) } mode="submit" /> : null }
                        </Header>
                        <PropertyEdit label="Title" value={ title } onUpdate={ e => this.handleUpdate(e) } name="title" />
                        <PropertyEdit label="Author" value={ author } onUpdate={ e => this.handleUpdate(e) } name="author" />
                        <PropertyView label="Description" value={ description } onClick={() => this.setState({ view: 'edit-text' })} />
                        <PropertyView 
                            label="Subjects" 
                            value={ selectedTopics.length ? selectedTopics.map(topic => `${topic[DISPLAY_KEY]}, `) : "None Selected" } 
                            onClick={ () => this.setState({ view: 'select-subjects' }) } 
                        />
                        <PropertyView 
                            label="Places" 
                            value={ selectedPlace.length ? selectedPlace.map(place => `${place[DISPLAY_KEY]}, `) : "None Selected" } 
                            onClick={ () => this.setState({ view: 'select-location' }) } 
                        />
                    </React.Fragment>
                )
            case "edit-text":
                let defaultedDescription = {...form, description: this.props.form.description}
                return(
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={ () => this.setState({ view: "edit", form: defaultedDescription}) } />
                            <Title value="Edit Description" />
                            <Navigator onClick={ () => this.setState({view: "edit"}) } mode="save" />
                        </Header>
                        <TextBox value={ description } onUpdate={ e => this.handleUpdate(e) } name="description"/>
                    </React.Fragment>
                )
            case "select-subjects":
                return (
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={ () => this.setState({view: "edit"}) } />
                            <Title value="Edit Subjects" />
                            <Navigator onClick={ () => this.setState({ view: "edit" }) } mode="save" />
                        </Header>
                        {availableTopics.map(topic => {
                           return <PropertyEdit key={topic[VALUE_KEY]} label={ topic[DISPLAY_KEY] } value={ topic[VALUE_KEY] } mode="select-option" onSelect={ data => this.handleMultiSelect(data) } selectedData={ selectedTopics }/>
                        })}
                    </React.Fragment>
                )
            case "select-location":
                return (
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={ () => this.setState({ view: "edit" }) } />
                            <Title value="Edit Location" />
                        </Header>
                        {availablePlaces.map(place => {
                            return <PropertyEdit key={place[VALUE_KEY]} label={ place[DISPLAY_KEY] } value={ place[VALUE_KEY] } mode="select-option" onSelect={ data => this.handleSingleSelect(data) } selectedData={ selectedPlace } />
                        })}
                    </React.Fragment>
                )
        }
    }
}

export default Edit;