import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home/Index';
import { NewRoom } from './pages/NewRoom/Index';
import { Room } from './pages/Room/Index';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import  ConfirmContextProvider  from './contexts/ConfirmContext';
import { AdminRoom } from './pages/AdminRoom/Index';
import DeleteModal from './components/DeleteModal/Index';

export function App() {
  const { user, signInWithGoogle } = React.useContext(AuthContext)


  return (
    <ConfirmContextProvider>
      <AuthContextProvider>
        <DeleteModal/>        
        <BrowserRouter>      
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' exact component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom}/>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </ConfirmContextProvider>
  );
}
