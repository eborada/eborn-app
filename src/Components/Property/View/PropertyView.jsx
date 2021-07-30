import React from 'react';
import '../Property.css';

export class PropertyView extends React.PureComponent {

    static defaultProps = {
        mode: "data",
        label: "",
        value: "",
        onClick: () => {}
    }

    render() {
        const { mode, label, value } = this.props;
        
        switch (mode) {
            case 'menu-option':
                return (
                    <div className="property-wrapper menu-option" onClick={() => this.props.onClick()}>
                        <span>{ label }</span>
                    </div>
                )
            default:
            case 'data':
                return (
                    <div className="property-wrapper" onClick={() => this.props.onClick()}>
                        <label className="property-label">{label}</label> <span className="property-value">{value}</span>
                    </div>
                )
        }
    }
}

export default PropertyView;