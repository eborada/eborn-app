import React from 'react';
import '../Property.css';

export class PropertyEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selections: []
        }
    }

    static defaultProps = {
        selected: false,
        mode: "data",
        label: "",
        value: "",
        selections: [],
        onUpdate: () => { }
    }

    handleChange = (event) => {
        this.props.onSelect(event.target.value)
    }


    render() {
        const { mode, label, name, value, selected } = this.props;
        const selectedClass = selected ? "selected" : "unselected";
        switch (mode) {
            default:
            case 'data':
                return (
                    <div className="property-wrapper">
                        <label className="property-label"> { label } </label> 
                        <input name={name} className="property-value" onChange={(e) => this.props.onUpdate(e)} value={value}/>
                    </div>
                )
            case 'select-option':
                return (
                    <div className="select-property-wrapper" key={value} >
                        <label className="select-property-label" > {label} </label> 
                        <input
                            key={value}
                            checked={this.props.selections[value]}
                            type="checkbox" 
                            id={label}
                            name={label}
                            value={value}
                            onChange={(e) =>this.handleChange(e)}

                        />
                    </div>
                )
        }
    }
}

export default PropertyEdit;