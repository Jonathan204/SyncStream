import React from "react";
import { PersonCircle } from "react-bootstrap-icons";
import UserInfo from "../infoWindow/currLocation.js";

class markerLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        showInfo: false,
        isUser: this.props.isUser,    
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      showInfo: !state.showInfo,
    }));
  }

  render() {
    return (
      <div>
        {this.state.isUser ? (
            <div>
            <PersonCircle onClick={this.handleClick} color="royalblue" size={50} />
            {this.state.showInfo && <UserInfo myself={this.props.myself}></UserInfo>} 
            </div>
        ) : 
        <PersonCircle color="red" size={50} />
        
        }

      </div>
    );
  }
}

export default markerLocation;
