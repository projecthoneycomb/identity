import React from 'react';
import { UserContext } from './user-context';
import { Redirect } from 'react-router';

export default class Authorise extends React.Component{
  render() {
    let params = new URLSearchParams(window.location.search);
    let idToken = params.get('id_token') as string;
    return <UserContext.Consumer>
      { (user) => {
        if(idToken) {
          window.localStorage.setItem('token', idToken);
          user.auth = { token: idToken };
          user.isAuthenticated = true;
        }
        return <UserContext.Provider value={user}> 
          <Redirect to="/login"></Redirect>
        </UserContext.Provider>
      }

      }
    </UserContext.Consumer>
  }
}