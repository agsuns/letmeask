import './styles.scss';
import emptyQuestions from '../../assets/images/empty-questions.svg';
import { useAuth } from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

export default function NoQuestionsBox() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`no-questions-container ${theme}`}>
      <img src={emptyQuestions} alt="no questions" />
      <p>Nenhuma pergunta por aqui...</p>
      {!user && <span>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</span>}
    </div>
  )
}
