import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth';
import { Home } from '../pages/Home/Index';
import { NewRoom } from '../pages/NewRoom/Index';
import { Room } from '../pages/Room/Index';
import { AdminRoom } from '../pages/AdminRoom/Index';
import Loader from '../components/Loader';

export default function Routes() {

  const {user} = useAuth();

  type RouteType = {
    path: string;
    exact?: boolean;
    component?: any;
    children?: any;
  }
  
  const ProtectedRoute: React.FunctionComponent<RouteType> = ({ ...props }) => {        
    if (user?.id) {
      return <Route {...props}/>
    }
    else return <Redirect to="/" />;
  };

  return (
    <> 
      <BrowserRouter>                
        <Switch>          
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' exact component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
          <ProtectedRoute path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
    </BrowserRouter>      
    </>
  )
}
