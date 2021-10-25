import './styles.scss';
import emptyQuestions from '../../assets/images/empty-questions.svg';

export default function NoQuestionsBox() {
  return (
    <div className="no-questions-container">
      <img src={emptyQuestions} alt="no questions" />
      <p>Nenhuma pergunta por aqui...</p>
      <span>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</span>
    </div>
  )
}
