import React from 'react';
import './index.css';
import Button from '../button';
import { UserContext } from '../auth/user-context';

import logout from './logout.svg';

export default class Sidebar extends React.Component {

  render() {
    return <UserContext.Consumer>
        {
          (user) => {
            return <div className="container">
              <h2>Welcome back <strong>{(user.profile || {}).firstName}</strong></h2>
              <hr></hr>
              {this.props.children}
              <hr></hr>
              <Button onClick={() => user.logout()} icon={logout}>
                 Log out
              </Button>
            </div>
          }
        }
      </UserContext.Consumer>
  }
}