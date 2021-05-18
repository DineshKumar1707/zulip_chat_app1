import React, { Component } from "react";
import Avatar from "./Avatar";
import { Link } from 'react-router-dom';

class ChatListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherUser: this.props.mail, 
      receiverName: this.props.name,
      receiverAvatar: this.props.image,
    };
    console.log(this.state.otherUser);
  }

  render() {
    return (
      <Link to={`/${this.state.otherUser}`} style={{ textDecoration: 'none' }}>
        <div
          key={this.state.otherUser}
          style={{ animationDelay: `0.${this.props.animationDelay}s` }}
          
          className={`chatlist__item ${
            this.props.active ? this.props.active : ""
          } `}
        >
          <Avatar
            image={
              this.props.image ? this.props.image : "http://placehold.it/80x80"
            }
            isOnline={this.props.isOnline}
          />

          <div className="container__name_msg">
            <div className="userMeta">
              <p>{this.props.name}</p>
              <span className="message">Hey, hi</span>
            </div>
            <div className="userMeta1">
              <p>3:42 PM</p>
              <span>1</span>
            </div>
          </div>
          <div className="container__time__msg_no">
            <div className="time__msg_no">

            </div>
          </div>

          {/* <div className="userMeta">
            <span className="message">Last Message Shown Here</span>
            <span className="activeTime">32 mins ago</span>
          </div> */}
        </div>
      </Link>
    );
  }
}

export default ChatListItems;




