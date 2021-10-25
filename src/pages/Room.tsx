import React from 'react';
import { useParams } from 'react-router';
import logo from '../assets/images/logo.svg';
import '../styles/room.scss'
import { Button } from '../components/Button';
import NoQuestionsBox from '../components/NoQuestionsBox';
import RoomCode from '../components/RoomCode';
import QuestionBox from '../components/QuestionBox';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

interface RoomParams {
  id: string,
}
export interface Question {
  content: string,
  author: {
    name: string,
    avatar: string,
    isHighlighted: boolean,
    isAnswered: boolean,
  },
}

interface FirebaseQuestion {
  authorId: string,  
  questions: Question,
  title: string,
} 

export function Room () {
  // const {roomQuestions, setRoomQuestions} = React.useState([] as Question);
  const {user} = useAuth();
  const roomParams = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = React.useState('');
  const [questions, setQuestions] = React.useState<Question []>([]);
  const [title, setTitle] = React.useState('');
  
  const roomId = roomParams.id;
  const handleSendQuestion = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (newQuestion.trim() === '') return;
    if (!user) throw new Error('User is not logged in.');
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
        isHighlighted: false,
        isAnswered: false,
      }
    }
    
    await database.ref(`rooms/${roomId}/questions/`).push(question);
    setNewQuestion('');
  } 

  React.useEffect(() => {     
      const roomQuestionsRef = database.ref(`rooms/${roomId}`);

      roomQuestionsRef.on('value', (dataSnapshot) => {        
        const firebaseSnapshot : FirebaseQuestion = dataSnapshot.val();
        const fetchedQuestions  = firebaseSnapshot.questions ?? {};

        const parsedQuestions = Object.entries(fetchedQuestions).map(([key, value]) => {
          return {
            id: key,
            author: value.author,
            content: value.content,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          }
        });      
        
        setQuestions(parsedQuestions);
        setTitle(firebaseSnapshot.title);                
      });

  }, [roomId]);
  
  return (
    <div id="room-container">
     <header>
       <div className="content">
         <img src={logo} alt="letmeask logo" />
         <RoomCode code={roomParams.id}/>   
       </div>
     </header>

     <main className="main-content">
       <div className="room-title">
         <h1>Sala {title}</h1>
         {questions && <span>{questions.length} pergunta(s)</span>}
       </div>
 
       <form onSubmit={handleSendQuestion}>
         <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
         />

         <div className="form-footer">
            { user ? (
             <div className="user-info">
               <img src={user.avatar} alt="user" />
               <span>{user.name}</span>
            </div>

            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>            
            ) }
           <Button type="submit" disabled={!user}>Enviar pergunta</Button>
         </div>

       </form>       

      {questions.length === 0 && <NoQuestionsBox></NoQuestionsBox>}
      {questions.length != 0 && questions.map((question, index) => {
         return <QuestionBox question={question} key={index}></QuestionBox>
       })}
     </main>
   </div>
  );
}