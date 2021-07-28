import React from 'react';
import './Navigator.css';

export class Navigator extends React.PureComponent {

    static defaultProps = {
        mode: "back",
        onclick: () => {},
    }

    render() {
        const { mode } = this.props;

        return (
            <div className={`nav-wrapper ${mode}`} onClick={ () => this.props.onClick() }>
                <span> { mode } </span>
            </div>
        )
    }
}

export default Navigator;