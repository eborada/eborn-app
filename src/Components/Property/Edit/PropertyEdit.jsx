import React from 'react';
import { VALUE_KEY } from '../../../constants';
import '../Property.css';

export class PropertyEdit extends React.PureComponent {
    static defaultProps = {
        selected: false,
        mode: "data",
        label: "",
        value: "",
        selectedData: [],
        onUpdate: () => { }
    }

    render() {
        const { mode, label, name, value } = this.props;
        let output = this.props.selectedData.map(obj => obj[VALUE_KEY]);

        switch (mode) {
            default:
            case 'data':
                return (
                    <div className="property-wrapper">
                        <label className="property-label">{ label }</label> 
                        <div className="property-value">
                            <input name={name} onChange={(e) => this.props.onUpdate(e)} value={value} type="text"/>
                        </div>
                    </div>
                )
            case 'select-option':
                return (
                    <div className="select-multi-wrapper" key={value} >
                        <label className="select-property-label" >{label}</label> 
                        <div className="input-wrapper">
                        <input
                            checked={output.includes(value)}
                            type="checkbox" 
                            id={label}
                            name={label}
                            value={value}
                            onChange={(e) => this.props.onSelect(Number(e.target.value))}

                        />
                        </div>
                    </div>
                )
        }
    }
}

export default PropertyEdit;