import React from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import InfoWindow from "../InfoWindow/InfoWindow.js";

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
        {this.props.profilePic ? (
          <Image
            src={this.props.profilePic}
            height={50}
            width={50}
            roundedCircle
            onClick={this.handleClick}
          ></Image>
        ) : (
          <PersonCircle
            onClick={this.handleClick}
            color={isUser ? "royalblue" : "red"}
            size={50}
          />
        )}
        {showInfo && (
          <InfoWindow isUser={isUser} userId={this.props.userName} render />
        )}
      </div>
    );
  }
}

export default MarkerLocation;
