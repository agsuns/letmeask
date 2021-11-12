import React from 'react';
import { ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

interface User {
  name: string,
  id: string,
  avatar: string,
}

interface AuthContextInterface {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>,
  loading: boolean,
}

interface AuthContextProviderProps {
  children: ReactNode,
}

export const AuthContext = React.createContext({} as AuthContextInterface);

export const AuthContextProvider = ({children} : AuthContextProviderProps) => {
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    setLoading(prev => true);
    
    const unsubscribe = auth.onAuthStateChanged((user) => {

      if (user) {
        const {displayName, photoURL, uid} = user;        
      
        if(!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        console.log('right before setUser, loading:', loading)
        setUser({name: displayName, id: uid, avatar: photoURL});
        console.log('signIn: ', user);
      }
      setLoading(prev => false);
    })

    return () => {
      unsubscribe();
    }
  }, []);


  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      
    if (result.user) {
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({name: displayName, id: uid, avatar: photoURL});
      console.log('signIn: ', user);
      setLoading(prev => false);
    }      
    };

  return (
    <AuthContext.Provider value={{user, signInWithGoogle, loading}}>        
      {children}
    </AuthContext.Provider>  
  );
}