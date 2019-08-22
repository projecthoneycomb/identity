import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './user-context';

export const SecureRoute = ({ component: Component, ...rest }: any) => {
  return (
    // SecureRoute asks like a middleware to a real route with some conditional logic.
    <Route {...rest} render={ (props: JSX.IntrinsicAttributes) =>
      <UserContext.Consumer>
        {
          ({ isAuthenticated }) => {
            if (isAuthenticated) {
              return <Component {...props} />
            } else {
              return <Redirect to={{ pathname: "/login"}}></Redirect>
            }
          }
        }
      </UserContext.Consumer>
    }>
    </Route>
  )
};