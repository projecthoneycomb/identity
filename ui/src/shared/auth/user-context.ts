import React from 'react';

class User {
  isAuthenticated: boolean;
  auth?: {
    token?: string
  }
  profile?: {
    firstName?: string,
    lastName?: string
  }

  constructor(token: string) {
    this.isAuthenticated = false;
    this.profile = { firstName: 'James', lastName: 'Williams' }

    if(token) {
      this.isAuthenticated = true;
      this.auth = { token };
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    window.location.reload();
  }
}

let tokenFromLocalStorage = window.localStorage.getItem('token');
let defaultUser = new User(tokenFromLocalStorage || '');

export const UserContext = React.createContext<User>(defaultUser);