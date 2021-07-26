import React from 'react';
import './Property.css';

export class PropertyView extends React.PureComponent {

    static defaultProps = {
        mode: "data",
        label: "",
        value: "",
        collection: [],
        onClick: () => {}
    }

    render() {
        const { mode, label, value, collection } = this.props;
        const valuesToShow = collection.length ? collection : value;
        
        switch (mode) {
            case 'menu-option':
                return (
                    <div className="property-wrapper menu-option" onClick={() => this.props.onClick()}>
                        <span> { label } </span>
                    </div>
                )
            default:
            case 'data':
                return (
                    <div className="property-wrapper" onClick={() => this.props.onClick()}>
                        <label className="property-label"> {label} </label> <span className="property-value"> {valuesToShow} </span>
                    </div>
                )
        }
    }
}

export default PropertyView;