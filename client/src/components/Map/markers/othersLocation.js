import React from 'react'
import { PersonCircle } from 'react-bootstrap-icons';
import UserInfo from '../infoWindow/currLocation.js'

class otherLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showInfo: false };
        
    }


    render() {
        return (
            <div>
                <PersonCircle color="red" size={50} />
                {this.state.showInfo && <UserInfo></UserInfo>}
            </div>
        )
    }
}

export default otherLocation;