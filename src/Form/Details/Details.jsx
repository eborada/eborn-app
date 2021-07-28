import React from 'react';

import Header from '../../Components/Header/Header.jsx';
import Navigator from '../../Components/Header/Navigator/Navigator.jsx';
import PropertyView from '../../Components/Property/View/PropertyView.jsx';
import Title from '../../Components/Header/Title/Title.jsx';

import { DISPLAY_KEY } from '../../constants.js'; 
export class Details extends React.PureComponent {

    static defaultProps = {
        data: {},
        changeView: () => {}
    }

    render() {
        const { data } = this.props;
        const { title, author, description, selectedTopics, selectedPlace } = data;

        return (
            <React.Fragment>
                <Header>
                    <Title value="View Details" />
                    <Navigator onClick={ () => this.props.changeView("actions") } mode="menu" />
                </Header>
                <PropertyView label="Title" value={ title } />
                <PropertyView label="Author" value={ author } />
                <PropertyView label="Description" value={ description } />
                <PropertyView label="Subjects" value={ selectedTopics.length ? selectedTopics.map(topic => `${topic[DISPLAY_KEY]}, `) : "None Selected" } />
                <PropertyView label="Places" value={ selectedPlace.length ? selectedPlace.map(place => `${place[DISPLAY_KEY]}, `) : "None Selected" } />
            </React.Fragment>
        )
    }
}

export default Details;