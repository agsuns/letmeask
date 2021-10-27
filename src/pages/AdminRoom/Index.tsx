import React from 'react';
import { useParams } from 'react-router';
import logo from '../../assets/images/logo.svg';
import { Button } from '../../components/Button/Index';
import NoQuestionsBox from '../../components/NoQuestionsBox/Index';
import RoomCode from '../../components/RoomCode/Index';
import QuestionBox from '../../components/QuestionBox/Index';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import useRoom from '../../hooks/useRoom';
import DeleteModal from '../../components/DeleteModal/Index';
import "../Room/styles.scss"

//icons import for modal
import garbageCan from '../../assets/images/garbageCan.svg';
import deleteIcon from '../../assets/images/deleteIcon.svg';

interface RoomParams {
  id: string,
}

export interface Question {
  id: string,
  content: string,
  author: {
    name: string,
    avatar: string,
    isHighlighted: boolean,
    isAnswered: boolean,
  },
}

export function AdminRoom () {
  const {user} = useAuth();
  const [deleteQuestion, setDeleteQuestion] = React.useState(false);
  const [deleteRoom, setDeleteRoom] = React.useState(false);

  const roomParams = useParams<RoomParams>();   
  const roomId = roomParams.id;

  const {questions, title} = useRoom(roomId);

  const handleDeleteQuestion = async (questionId: string) => {
    setDeleteQuestion(true);
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  const handleDeleteRoom = async () => {
    setDeleteRoom(true);
    await database.ref(`rooms/${roomId}`).remove();    
  }
  
  return (
    <div id="room-container">
     <header>
       <div className="content">
         <img src={logo} alt="letmeask logo" />
         <div className="admin-button-container">
            <DeleteModal
              show={deleteRoom}
              imgRef={deleteIcon}
              title="Encerrar sala"
              paragraph="Tem certeza que deseja encerrar esta sala?"
              acceptButtonText="Sim, encerrar"
              onClose={() => setDeleteRoom(false)}
              onDelete={() => handleDeleteRoom()}

            />
            <RoomCode code={roomParams.id}/>   
            <Button isOutlined onClick={() => setDeleteRoom(true)}>Encerrar</Button>
         </div>
       </div>
     </header>

     <main className="main-content">       
       <div className="room-title">
         <h1>Sala {title}</h1>
         {questions && <span>{questions.length} pergunta(s)</span>}
       </div>
 
        {questions.length === 0 && <NoQuestionsBox></NoQuestionsBox>}
        {questions.length != 0 && questions.map((question, index) => {            
          return (
            
            <QuestionBox question={question} key={question.id }>
              <DeleteModal 
                  title='Excluir pergunta'
                  paragraph="Tem certeza que você deseja excluir esta pergunta?"
                  imgRef={garbageCan}
                  show={deleteQuestion} 
                  acceptButtonText="Sim, excluir"
                  onClose={() => setDeleteQuestion(false)}
                  onDelete={() => handleDeleteQuestion(question.id)}
              />
              <button className="delete-question like-button " onClick={() => setDeleteQuestion(true)}>                                

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

              </button>
            </QuestionBox>)
        })}
     </main>
   </div>
  );
}