import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png'
export default function ContactDetail(props) {
    const {name,email} = props.location.state.contact;
  return (
      <div className="main">
          <div className="ui card centered">
              <div className="image">
                  <img src={user} alt="user" />
              </div>
              <div className="content">
                  <div className="header">Name: {name}</div>
                  <div className="header">Email: {email}</div>
              </div>
          </div>
          <div className="center-div">
                <Link to='/'>
                <button className="ui button blue center">
                    Back to contact list
                </button>
                </Link>
            </div>
      </div>
  );
}
