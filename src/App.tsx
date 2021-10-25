import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home/Index';
import { NewRoom } from './pages/NewRoom/Index';
import { Room } from './pages/Room/Index';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';



export function App() {
  const {user, signInWithGoogle} = React.useContext(AuthContext)


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={ Home }/>
          <Route path='/rooms/new' exact  component={ NewRoom }/>
          <Route path='/rooms/:id' component={ Room }/>
        </Switch>
      </AuthContextProvider>
      
    </BrowserRouter>
  );
}
