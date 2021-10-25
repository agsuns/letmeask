import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
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
