// import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import whiteLogo from '../../assets/images/white-logo.svg';
import { Button } from '../../components/Button/Index';
import NoQuestionsBox from '../../components/NoQuestionsBox/Index';
import RoomCode from '../../components/RoomCode/Index';
import QuestionBox from '../../components/QuestionBox/Index';
import { database } from '../../services/firebase';
import useRoom from '../../hooks/useRoom';
import "../Room/styles.scss"
import { FirebaseQuestion } from '../../models/question';
import useConfirm from '../../hooks/useConfirm';
import garbageCan from '../../assets/images/garbageCan.svg';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import useTheme from '../../hooks/useTheme';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader';

interface RoomParams {
  id: string,
}

export function AdminRoom () {
  const { user } = useAuth();
  const { isConfirmed } = useConfirm();
  const history = useHistory();
  const { theme, toggleTheme } = useTheme();
  const { id: roomId } = useParams<RoomParams>();     
  const { questions, title, authorId, useRoomLoading } = useRoom({roomId});
  const [svgCxValue, setSvgCxValue] = React.useState('30.5');  
  

  const handleDeleteQuestion = async (questionId: string) => {
    const result = await isConfirmed(
      "Excluir",
      "Você deseja excluir esta pergunta?",
      garbageCan,
    )

    if (result) 
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();        
  }
  const handleDeleteRoom = async () => {
    const result = await isConfirmed(
      "Encerrar",
      "Você deseja encerrar esta sala?",
      deleteIcon,
    );
    if (result) {
      await database.ref(`rooms/${roomId}`).update({ 
        closedAt: new Date(),
      });    

      history.push('/');
    }    
  }
  const handleHighlightQuestion = async (questionId: string) => {
    const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);
    const questionSnapshot = await questionRef.get();
    const questionValue = questionSnapshot.val() as FirebaseQuestion;


    await questionRef.update({isHighlighted: !questionValue.isHighlighted});
  }
  const handleIsAnswered = async (questionId: string) => {
    const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);
    const questionSnapshot = await questionRef.get();
    const questionValue = questionSnapshot.val() as FirebaseQuestion;

    await questionRef.update({isAnswered: !questionValue.isAnswered});
  }
  //makes the toggle button move everytime the theme variable changes
  React.useEffect(() => {  
    setSvgCxValue(theme === 'dark' ? '75.5' : '30.5');
    
  }, [theme]);

  
  if (useRoomLoading) return <Loader/>
  else if (user?.id === authorId) return (
    <div className={`room-container ${theme}`}>
     <header>
       <div className="content">
         <img src={theme === 'light' ? logo : whiteLogo} alt="lwhite-logogo" onClick={() => history.push('/')}/>
         <div className="button-container">
          <RoomCode code={roomId}/>   
          <Button isOutlined onClick={handleDeleteRoom}>Encerrar</Button>
          <button className='toggle' onClick={toggleTheme}>
            <svg width="107" height="57" viewBox="0 0 107 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect id='rect' x="1" y="1" width="105" height="55" rx="27.5" stroke="#835afd" stroke-width="2" />
              <circle id="circle" cx={svgCxValue} cy="28.5" r="22.5" fill="#835afd" />
            </svg>
          </button>        
         </div>
       </div>
     </header>

     <main className="main-content">       
     
       <div className="room-title">
         <h1>Sala {title}</h1>
         {questions && <span>{questions.length} pergunta(s)</span>}
       </div>
 
        {questions.length === 0 && <NoQuestionsBox></NoQuestionsBox>}
        {questions.length != 0 && questions.map((question) => {            
          return (
            
            <QuestionBox question={question} key={question.id }>             

              <button className="func-button checkmark-button" onClick={() => handleIsAnswered(question.id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.0001" cy="12" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.44263 12.3392L10.6105 14.5071L10.5965 14.4931L15.4876 9.60205" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>              

              <button className="func-button highlight-button" onClick={() => handleHighlightQuestion(question.id)}>
                <svg className="delete-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 18H18C19.657 18 21 16.657 21 15V7C21 5.343 19.657 4 18 4H6C4.343 4 3 5.343 3 7V15C3 16.657 4.343 18 6 18H7.5V21L12 18Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>                 
              </button>

              <button className="func-button delete-button" onClick={() => handleDeleteQuestion(question.id)}>                                
                <svg className="highlight-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>        
            </QuestionBox>)
        })}
     </main>
   </div>
  );

  else return <div>You don't have permission to access this room as admin.</div>
}