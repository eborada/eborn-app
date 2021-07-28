import React from 'react';
import './Title.css';

export class Title extends React.PureComponent {

    static defaultProps = {
        value: "Value",
    }

    render() {
        const { value } = this.props;

        return (
            <div className="title-wrapper">
                <span>{ value }</span>
            </div>
        )
    }
}

export default Title;