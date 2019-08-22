import React from 'react';
import { UserContext } from './user-context';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends React.Component{
  render() {
    const style = {
      display: 'flex',
      height: 'calc(100vh - 85px)',
      justifyContent: 'center',
      alignItems: 'center'
    };

    const textStyle = {
      marginTop: '-120px'
    }

    return <UserContext.Consumer> 
    {
      ({isAuthenticated}) => {
        if (isAuthenticated) {
          return <div>
            <Redirect to="/users"></Redirect>
          </div>
        } else {
          let b2cLoginUrl = `https://${process.env.REACT_APP_B2C_HOST}/${process.env.REACT_APP_B2C_DIRECTORY}/oauth2/v2.0/authorize?p=${process.env.REACT_APP_B2C_POLICY}&client_id=${process.env.REACT_APP_B2C_CLIENT_ID}&scope=${process.env.REACT_APP_B2C_SCOPE}&nonce=default&response_type=id_token&prompt=login&response_mode=query&redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}/authorise`)}`;
          window.location.href = b2cLoginUrl;
          return <div className="container" style={style}>
            <h1 style={textStyle}>Loading...</h1>
          </div>
        }
      }
    } 
    </UserContext.Consumer>
  }
}