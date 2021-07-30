import React from 'react';
import './TextBox.css';

export class TextBox extends React.PureComponent {
    static defaultProps = {
        onUpdate: () => { }
    }

    render() {
        const { name, value } = this.props;
        return (
            <div className="property-wrapper">
                <textarea name={ name } value={ value } onChange={ e => this.props.onUpdate(e) }></textarea>
            </div>
        )
    }
}

export default TextBox;