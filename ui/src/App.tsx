import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import add from './assets/add.svg';

import { SecureRoute } from './shared/auth/secure-route';

import Header from './shared/header';
import Sidebar from './shared/sidebar';
import Button from './shared/button';
import Login from './shared/auth/login';
import Authorise from './shared/auth/authorise';
import CreateOrganisationModal from './organisation/create';

function OrganisationList() {
  return <div className="two-column-layout-center">
    <div className="container">
      <h2>Organisations</h2>
      <hr></hr>
    </div>
    <div className="container">
      <h2>James’s Academy</h2>
      <hr></hr>
    </div>
  </div>;
}

function UserList() {
  return <div className="container">
    <h2>Users</h2>
    <hr></hr>
  </div>;
}

function Main(){
  return <div className="two-column-layout">
    <Switch>
      <SecureRoute path="/organisations" component={OrganisationList}></SecureRoute>
      <SecureRoute path="/users" component={UserList}></SecureRoute>
    </Switch>
    <SecureRoute path="/organisations/new" component={CreateOrganisationModal}></SecureRoute>
    <Sidebar>
      <Button type="branded" icon={add}>
        Create <strong>new invite</strong>
      </Button>
      <Link to="/organisations/new">
        <Button type="branded" icon={add}>
        Create <strong>new organisation</strong>
        </Button>
      </Link>
    </Sidebar>
  </div>
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header>Honeycomb <strong>IAM</strong></Header>
        <SecureRoute path="/" component={Main}></SecureRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/authorise" component={Authorise}></Route>
      </div>
    </Router>
  );
}

export default App;
