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
}

interface AuthContextProviderProps {
  children: ReactNode,
}

// diferença entre {} as AuthContextInterface e React.createContext<AuthContextInterface>() ou React.createContext<AuthContextInterface>({})
export const AuthContext = React.createContext({} as AuthContextInterface);

export const AuthContextProvider = ({children} : AuthContextProviderProps) => {
  const [user, setUser] = React.useState<User>();
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const {displayName, photoURL, uid} = user;        
      
        if(!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({name: displayName, id: uid, avatar: photoURL});
        console.log('signIn: ', user);
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);


  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      
    if (result.user) {
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({name: displayName, id: uid, avatar: photoURL});
      console.log('signIn: ', user);
    }
      
    };

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>        
      {children}
    </AuthContext.Provider>  
  );
}