import React from 'react';
import { useHistory, useParams } from 'react-router';
import logo from '../../assets/images/logo.svg';
import whiteLogo from '../../assets/images/white-logo.svg';
import './styles.scss'
import { Button } from '../../components/Button/Index';
import NoQuestionsBox from '../../components/NoQuestionsBox/Index';
import RoomCode from '../../components/RoomCode/Index';
import QuestionBox from '../../components/QuestionBox/Index';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import useRoom from '../../hooks/useRoom';
import useTheme from '../../hooks/useTheme';
import Loader from '../../components/Loader';
import Notification from '../../components/NotificationModal';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import { Link } from 'react-router-dom';

interface RoomParams {
  id: string,
}

export function Room () {  
  const {user} = useAuth();
  const history = useHistory();
  const {theme, toggleTheme} = useTheme();
  const roomParams = useParams<RoomParams>();   
  const roomId = roomParams.id;
  const [svgCxValue, setSvgCxValue] = React.useState('30.5');  
  
  const {questions, title, useRoomLoading} = useRoom({roomId});
  const [newQuestion, setNewQuestion] = React.useState('');  
  const [signInModal, setSignInModal] = React.useState(false);  
  const [proceed, setProceed] = React.useState<{proceed: (arg: string) => void}>({proceed: (arg: string) => {}});


  const handleSendQuestion = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (newQuestion.trim() === '') return;
    if (!user) throw new Error('User is not logged in.');
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,        
      },      
      isHighlighted: false,
      isAnswered: false,
    }
    
    await database.ref(`rooms/${roomId}/questions/`).push(question);
    setNewQuestion('');
  }

  const handleLikeQuestion = async (questionId: string, likeId: string | undefined) => {
    // if the user presses the like button again but likeId already exists, the likeId is removed from the database
    if (!user) {            
        const promise = new Promise((resolve, reject) => {
          setSignInModal(true);                    

          
          setProceed({proceed: resolve});
        });
  
        promise
        .then(() => {          
          setSignInModal(false);
  
          history.push("/");        
          return;
        });  
        return;
      }


    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        userId: user?.id
      });
    }
  }  
  React.useEffect(() => {
    setSvgCxValue(theme === 'light' ? '30.5' : '75.5');
  }, [theme]);

  if (useRoomLoading) return <Loader/>

  return (
    <>
      <Notification
        isOpen={signInModal}
        setIsOpen={setSignInModal}
        iconRef={deleteIcon}
        title="Login não realizado"
        text="É necessário estar logado para curtir uma pergunta"
        proceed={proceed.proceed}
      />
      <div className={`room-container ${theme}`}>      
      <header>
        <div className="content">
          <img src={theme === 'light' ? logo : whiteLogo} alt="letmeask logo" onClick={() => history.push('/')}/>
          <div className="button-container">
            <RoomCode code={roomParams.id}/>
            <button className="toggle" onClick={toggleTheme}>
                <svg width="107" height="57" viewBox="0 0 107 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect id='rect' x="1" y="1" width="105" height="55" rx="27.5" stroke="#835afd" strokeWidth="2" />
                  <circle id="circle" cx={svgCxValue} cy="28.5" r="22.5" fill="#835afd" />
                </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
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
                <img src={user.avatar} referrerPolicy="no-referrer" alt="user" />
                <span>{user.name}</span>
              </div>

              ) : (
                <span>Para enviar uma pergunta, <Link to='/' className='link'>faça seu login</Link>.</span>            
              ) }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>

        </form>       

        {questions.length === 0 && <NoQuestionsBox></NoQuestionsBox>}
        {questions.length != 0 && questions.map(question => {          
          return (
          <QuestionBox question={question} key={question.id }>
            {!question.isAnswered && (             
              <button className={`like-button ${question.likeId ? 'liked' : ''}`} type="button" aria-label="Marcar como gostei" onClick={() => handleLikeQuestion(question.id, question.likeId)}>
              {question.likesCount > 0 && <span>{question.likesCount}</span>}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>             
            )}
          </QuestionBox>
          )
        })}
      </main>
    </div>
   </>
  );
}