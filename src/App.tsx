import React from 'react';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';



export function App() {
  const {user, signInWithGoogle} = React.useContext(AuthContext)


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path='/' exact component={ Home }/>
        <Route path='/rooms/new' component={ NewRoom }/>
      </AuthContextProvider>
      
    </BrowserRouter>
  );
}
