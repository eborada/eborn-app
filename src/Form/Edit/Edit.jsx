import React from 'react';

import Header from '../../Components/Header/Header.jsx'
import Navigator from '../../Components/Header/Navigator/Navigator.jsx';
import PropertyView from '../../Components/Property/PropertyView.jsx';
import PropertyEdit from '../../Components/Property/Edit/PropertyEdit.jsx';
import TextBox from '../../Components/TextBox/TextBox.jsx';
import Title from '../../Components/Header/Title/Title.jsx';

import { DISPLAY_KEY, VALUE_KEY } from '../../constants.js';

export class Edit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                selectedTopics: props.data.selectedTopics,
                author: props.data.author,
                title: props.data.title,
                description: props.data.description
            },
            availableTopics: props.data.availableTopics,
            view: "edit"
        }
    }

    handleUpdate(e) {
        const { form } = this.state;
        const { name, value } = e.target; 
        this.setState({ form: { ...form, [name]: value }});
    }

    handleSelection(value) {
        value = Number(value)
        const { availableTopics, form } = this.state;
        let { selectedTopics = [] } = form;
        const selectedObject = availableTopics.filter(topic => topic[VALUE_KEY] === value);
        console.log(selectedTopics)
        if (selectedTopics.length === 0) {
            return this.setState({ form: { ...form , selectedTopics: selectedTopics.push(selectedObject)}})
            
        }
        else {
            let idx = -1;
            for (let i = 0; i < selectedTopics.length; i++) {
                if (selectedTopics[i][VALUE_KEY] === selectedObject[VALUE_KEY]) {
                    idx = i;
                }
            }
            idx > -1 ? selectedTopics.splice(idx, 1) : selectedTopics.push(selectedObject)
            return this.setState({ form: { ...form }, selectedTopics })
        }
    }

    render() {
        const { form, view, availableTopics } = this.state;
        const { data } = this.props;
        const { title, author, selectedTopics } = form;

        let submitable = title.length && author.length
        switch(view) {
            case "edit":
                return (
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={() => this.props.onReturn()} />
                            <Title value="Edit Details" />
                            {submitable ? <Navigator onClick={() => this.props.onSubmit(form)} mode="submit" /> : null}
                        </Header>
                        <PropertyEdit label="Title" value={form.title} onUpdate={(e) => this.handleUpdate(e)} name="title" />
                        <PropertyEdit label="Author" value={form.author} onUpdate={(e) => this.handleUpdate(e)} name="author" />
                        <PropertyView label="Description" value={form.description} onClick={() => this.setState({ view: 'edit-text' })} />
                        <PropertyView label="Subjects" value={selectedTopics.length ? selectedTopics.map(topic => `${topic[DISPLAY_KEY]}, `) : "None Selected"} onClick={() => this.setState({ view: 'select-multiple' })} />
                    </React.Fragment>
                )
            case "edit-text":
                let defaultedDescription = {...form, description: data.description}
                return(
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={() => this.setState({ view: "edit", form: defaultedDescription})} />
                            <Title value="Edit Description" />
                            <Navigator onClick={() => this.setState({view: "edit"})} mode="save" />
                        </Header>
                        <TextBox value={form.description} onUpdate={(e) => this.handleUpdate(e)} name="description"/>
                    </React.Fragment>
                )

            case "select-multiple":
                let defaultedTopics = {...form, selectedTopics: data.selectedTopics}
                return (
                    <React.Fragment>
                        <Header>
                            <Navigator mode="back" onClick={() => this.setState({view: "edit", form: defaultedTopics})} />
                            <Title value="Edit Subjects" />
                            <Navigator onClick={() => this.setState({ view: "edit" })} mode="save" />
                        </Header>
                        {availableTopics.map(topic => {
                           return <PropertyEdit label={topic[DISPLAY_KEY]} value={topic[VALUE_KEY]} mode="select-option" onSelect={(output) => {this.handleSelection(output)}}/>
                        })}
                    </React.Fragment>
                )
        }

    }
}

export default Edit;