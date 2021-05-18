import React, { Component } from "react";
import UserService from "../services/UserService";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import { makeStyles } from '@material-ui/core/styles'; 
import { Button, TextField } from "@material-ui/core";



class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allChatUsers: []
    };
  }

  componentDidMount(){
      UserService.getUsers().then((res) => {
        console.log(res.data);
          this.setState({ allChatUsers: res.data.members });
      });
      
  }
  

  render() {
    

    return (
      <div className="main__chatlist">
        <div className="chatlist__header">
          <div className="chatlist__heading">
            <h2>Messages</h2>
          </div>
          <div className="chatList__search">
            <div className="search_wrap">
              <button className="search-btn">
                  <i className="fa fa-search"></i>
              </button>
              <input type="text" placeholder="Search chat" required />
            </div>
          </div>
        </div>
        <div className="chatlist__body">
          <div className="chatlist__items">
            {this.state.allChatUsers && this.state.allChatUsers.map((item, index) => {
              return (
                  <ChatListItems
                  name={item.full_name}
                  key={item.user_id}
                  key1={item.user_id}
                  mail={item.email}
                  animationDelay={index + 1}
                  active={item.is_bot ? "active" : ""}
                  isOnline={item.is_active ? "active" : ""}
                  image={item.avatar_url}
                />  
              );
            })}
          </div>
          <div className="new__conversation">
            <Button variant="contained" id="newConversation">+</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatList;