import React from 'react';
import './Header.css';

export class Header extends React.PureComponent {
    render() {
        return (
            <div className="header-wrapper">
                {this.props.children}
            </div>
        )
    }
}

export default Header;
