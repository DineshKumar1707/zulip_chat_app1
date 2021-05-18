import React, { Component, createRef } from "react";
import axios from 'axios';
import "./chatContent.css";
import Avatar1 from "./Avatar1";
import ChatItem from "./ChatItem";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ReactHtmlParser from 'react-html-parser';
import UserService from "../services/UserService";



class ChatContent extends Component {

  messagesEndRef = createRef(null);
  chatItms = [];

    constructor(props) {
        super(props)
        
        this.state = {
            userReceiver: this.props.match.params.otherUser,
            userMsg: [],
            newMsg: [],
            chat: this.chatItms,
            msg: "",
            object: "Object.keys",
            othersLongPollResponse: {},
            longPollId: "",
            longPollUser: "",
            longPollMsg: "",
            longPollImage: "",
            adminMailId: "",
            longPollResponse: {},        
        }
        console.log(this.state.userReceiver);
        // console.log(this.state.chat);
        console.log(this.state.adminMailId);
        console.log(this.state.receiverName);
        console.log(this.state.newMsg)
    }

    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }


    sendMessage = () => {
      axios.post('http://localhost:8080/send', {
          msg: this.state.msg,
          user: this.state.userReceiver
      });
      this.chatItms.push({
        key: this.state.chat.length + 1,
        type: "",
        msg: this.state.msg,
        image: this.state.adminImage  
      });
      this.scrollToBottom();  
      this.setState({ msg: "" });
    };


    subscribe = async () => {
      let response = await axios.post('http://localhost:8080/registerForMessageEvents',{username: this.state.admin});
      console.log(response.data)
      if(response.data.result === 'error') {
        await this.subscribe();
      } else if (response.data.result === 'success'){
        let qid = response.data.queue_id;
        let msgL = await axios.post('http://localhost:8080/longpoll',{queue_id: qid});
        this.setState({newMsg: msgL.data})
        
        // console.log(this.state.newMsg.events[0].type);
        if(this.state.newMsg.events[0].type === "heartbeat"){
          await this.subscribe();
        } else if (this.state.newMsg.events[0].type === "message") {
          if(this.state.newMsg.events[0].message.sender_email === this.state.userReceiver) {
            this.setState({longPollResponse: this.state.newMsg.events[0].message});
            this.setState({longPollId: this.state.newMsg.events[0].message.id});
            this.setState({longPollUser: this.state.newMsg.events[0].message.sender_email});
            this.setState({longPollMsg: this.state.newMsg.events[0].message.content});
            this.setState({longPollImage: this.state.newMsg.events[0].message.avatar_url});

            this.chatItms.push({
              key: this.state.longPollId,
              type: "receiver",
              msg: this.state.longPollMsg,
              image: this.state.longPollImage  
            });
            this.setState({ chat: [...this.chatItms] });
            this.scrollToBottom();
            

            console.log(this.state.longPollResponse);  
          } else {
            this.setState({othersLongPollResponse: this.state.newMsg.events[0].message})
            
          }
          
        }
        await this.subscribe();
      }
    }
   
    componentDidMount() {
      

      UserService.getUsersMsg(this.state.userReceiver).then( res => {
      console.log(res.data);
      this.setState({userMsg: res.data.messages })
      console.log(this.state.userMsg);
      });


      UserService.getOwnUser().then( response => {
        // console.log(response.data);
        let ownUserEmail = response.data.email;
        let ownUserImage = response.data.avatar_url;
        // this.setState({admin: ownUserEmail});
        this.setState({admin: ownUserEmail}, () => {
          console.log(this.state.admin, 'admin')
        });
        this.setState({adminImage: ownUserImage}, () => {
          console.log(this.state.adminImage, 'admin')
        });
        console.log(this.state.admin);
      })

      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 ) {
          if (this.state.msg !== "") {
            this.chatItms.push({
              key: this.state.chat.length + 1,
              type: "",
              msg: this.state.msg,
              image: this.state.adminImage  
            });
            this.setState({ chat: [...this.chatItms] });
            this.sendMessage();
            this.scrollToBottom();  
            this.setState({ msg: "" });
          }
        }
      });
      this.subscribe();
      this.scrollToBottom();
    }

    

    onStateChange = (e) => {
        this.setState({ msg: e.target.value });    
    };



  render() {
    var isSender = this.state.admin;
    var isReceiver = this.state.userReceiver;
    var lpKey = this.state.longPollId;
    var lpUser = this.state.longPollUser;
    var lpMsg = this.state.longPollMsg;
    var lpImage = this.state.longPollImage;
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar1
                isOnline="active"
                image={lpImage}
              />
              <div className="container_name_online">
                <div className="receiver_name">
                  <p>{lpUser}</p>
                </div>
                <div className="receiver_online">
                  <span></span>
                  <div className="receiver_status">
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
          
            {this.state.userMsg && this.state.userMsg.map((itm, index) => {
                return (
                  <ChatItem
                    animationDelay={index + 2}
                    key={itm.id}
                    user={(itm.sender_email === isSender) ? "" : "receiver" }
                    msg={ReactHtmlParser(itm.content)}
                    image={itm.avatar_url}
                  />
                );
            })}
            {this.state.chat && this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "sender"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-paperclip"></i>
            </button>
            <input
                type="text"
                placeholder="Type your message here"
                onChange={this.onStateChange}
                value={this.state.msg}
            />
          </div>
          <div className="send_button">
          <Button variant="contained" id="sendMessage"><i onClick={this.sendMessage} className="fa fa-paper-plane"></i></Button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default ChatContent;