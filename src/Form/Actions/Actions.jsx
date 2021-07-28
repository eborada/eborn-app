import React from 'react';

import Header from '../../Components/Header/Header.jsx';
import Navigator from '../../Components/Header/Navigator/Navigator.jsx';
import PropertyView from '../../Components/Property/View/PropertyView.jsx';
import Title from '../../Components/Header/Title/Title.jsx';

export class Actions extends React.PureComponent {
    static defaultProps = {
        onReturn: () => {},
        onActionSelect: () => {}
    }
    
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Navigator mode="back" onClick={ () => this.props.onReturn() }/>
                    <Title value="Actions" />
                </Header>
                <PropertyView label="Edit Book Details" mode="menu-option" onClick={ () => this.props.onActionSelect('edit') }/>
            </React.Fragment>
        )
    }
}

export default Actions;