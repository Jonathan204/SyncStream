import React from 'react'
import { PersonCircle } from 'react-bootstrap-icons';
import UserInfo from '../infoWindow/currLocation.js'

class currLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showInfo: false };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            showInfo: !state.showInfo
        }));
    }

    render() {
        return (
            <div>
                <PersonCircle onClick={this.handleClick} color="royalblue" size={50} />
                {this.state.showInfo && <UserInfo></UserInfo>}
            </div>
        )
    }
}

export default currLocation;
