import React from "react";
import { PersonCircle } from "react-bootstrap-icons";
import UserInfo from "../InfoWindow/InfoWindow.js";

class MarkerLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      isUser: this.props.isUser,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState((state) => ({
      showInfo: !state.showInfo,
    }));
  };

  render() {
    const { isUser, showInfo } = this.state;
    return (
      <div id={this.props.name}>
        <PersonCircle
          onClick={this.handleClick}
          color={isUser ? "royalblue" : "red"}
          size={50}
        />
        {showInfo && (
          <UserInfo isUser={isUser} userId={this.props.userName} render />
        )}
      </div>
    );
  }
}

export default MarkerLocation;
