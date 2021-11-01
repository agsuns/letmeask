import React from 'react'
import { FirebaseQuestion, ClientQuestion } from '../models/question';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

interface useRoomProps {
  roomId: string,    
}

export default function useRoom( {roomId}: useRoomProps ) {
  const {user} = useAuth();
  const [questions, setQuestions] = React.useState<ClientQuestion []>([]);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {     
    
    const roomQuestionsRef = database.ref(`rooms/${roomId}`);

    //if it exists
    if(roomQuestionsRef) {  

      // if closedAt exists 
      if (!database.ref(`rooms/${roomId}/closedAt`)) {
        
      } else {
        roomQuestionsRef.on('value', (dataSnapshot) => {        
          const roomSnapshot = dataSnapshot.val();
          const fetchedQuestions: { [key: string]: FirebaseQuestion }  = roomSnapshot.questions ?? {};
                
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
          
          setQuestions(parsedQuestions);
          setTitle(roomSnapshot.title);                
      });
    }     
  }
    
    return () => {
      roomQuestionsRef.off('value');
    }

}, [roomId, user?.id]);
  
  
  return {questions, title}
}
