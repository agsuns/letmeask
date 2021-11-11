import React from 'react'
import { FirebaseQuestion, ClientQuestion } from '../models/question';
import { FirebaseRoom } from '../models/room';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

interface useRoomProps {
  roomId: string,    
}

export default function useRoom( {roomId}: useRoomProps ) {
  const {user} = useAuth();
  const [questions, setQuestions] = React.useState<ClientQuestion []>([]);
  const [authorId, setAuthorId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {     
    
    const roomQuestionsRef = database.ref(`rooms/${roomId}`);    

    roomQuestionsRef.on('value', (dataSnapshot) => {        

      if (dataSnapshot.exists()) {        
        const roomSnapshot: FirebaseRoom = dataSnapshot.val();
        const fetchedQuestions: { [key: string]: FirebaseQuestion }  = roomSnapshot?.questions ?? {};
        const parsedQuestions = Object.entries(fetchedQuestions).map(([key, value]) => {                
          return {
            id: key,
            content: value.content,
            author: value.author,     
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likesCount: Object.values(value?.likes ?? {}).length,
            likeId: Object.entries(value?.likes ?? {}).find(([key, like]) => {
            
              return like?.userId === user?.id;
            })?.[0],
          }
        });            

        setAuthorId(roomSnapshot.authorId);
        setQuestions(parsedQuestions);
        setTitle(roomSnapshot.title);    
      }        
      setLoading(false);
    }                                              
  );
      
    return () => {
      roomQuestionsRef.off('value');
    }

}, [roomId, user?.id]);
    
  return {questions, title, authorId, useRoomLoading: loading};
}
