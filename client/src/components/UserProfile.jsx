import React, { Component } from "react";
import UserService from "../services/UserService";
import "./userProfile.css";
import { Link } from 'react-router-dom';

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            adminEmail: "",
            adminName: "",
            adminAvatar: "",        
        }
        console.log(this.state.userReceiver);
        // console.log(this.state.chat);
        console.log(this.state.admin);
        console.log(this.state.receiverName)
    }

  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };

  componentDidMount () {

    UserService.getOwnUser().then( response => {
        // console.log(response.data);
        let ownUserEmail = response.data.email;
        let ownUserName = response.data.full_name;
        let ownUserAvatar = response.data.avatar_url
        // this.setState({admin: ownUserEmail});
        this.setState({adminEmail: ownUserEmail}, () => {
          console.log(this.state.adminEmail, 'admin')
        });
        this.setState({adminName: ownUserName}, () => {
            console.log(this.state.adminName, 'admin')
        });
        this.setState({adminAvatar: ownUserAvatar}, () => {
          console.log(this.state.adminAvatar, 'admin')
        });
        console.log(this.state.adminEmail);
      })

  }


  render() {
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="container__about">
            <div className="about">
              <h2>About</h2>  
            </div>
            <div className="close">
              <span>X</span>
            </div>
          </div>
          <div className="container">
            <div className="profile__image">
              <img src={this.state.adminAvatar} />
            </div>
            <div className="name">
              <h4>{this.state.adminName}</h4>
            </div>
          </div>
          <div className="container__mail">
            <div className="mail_icon">
              <i className="fa fa-envelope-o"></i>
            </div>
            <div className="mail_id">
              <p>{this.state.adminEmail}</p>
            </div>
          </div>
          <div className="container__institution">
            <div className="institution_icon">
              <i className="fa fa-university"></i>
            </div>
            <div className="institution_name">
              <p>PSG College of engineering</p>
            </div>
          </div>
          <div className="container__phone_no">
            <div className="phone_no_icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="phone_no">
              <p>9796677378</p>
            </div>
          </div>
          <div className="container__media">
            <h3>Media</h3>
            <div className="media_table">
              <table>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                </tr>
              </table>
            </div>
            <h6><Link>View More</Link></h6>
          </div>
        </div>
      </div>
    );
  }
}
