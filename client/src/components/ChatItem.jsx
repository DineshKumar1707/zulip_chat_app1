import React, { Component } from "react";
import Avatar from "./Avatar";


class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isReceiver = this.props.userReceiver;
    return (
      <div
        
        className={`${this.props.user ? this.props.user : "sender" }`}
      >
        <div className="chat__item__content">
          <p className="chat__msg">{this.props.msg}</p>
        </div>
        <div className="chat__meta">
            <span>Today 1.03PM</span>
        </div>
        {/* <Avatar isOnline="active" image={this.props.image} /> */}
      </div>
    );
  }
}

export default ChatItem;