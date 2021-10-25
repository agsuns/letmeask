import React from 'react';
import '../styles/question-box.scss';
import likeImg from '../assets/images/like.svg'
import { Question } from '../pages/Room';

interface QuestionProps {
  question: Question
}

export default function QuestionBox({question}: QuestionProps) {
  const [isHighlighted, setIshighlighted] = React.useState(false);
  const handleClick = () => {
    setIshighlighted(!isHighlighted);
  }

  return (
    <div className={`question-container ${isHighlighted ? 'highlight' : ''}`} onClick={handleClick}>
      <p className="question-content">
        {question.content}
      </p>

      <div className="info">
        <div className="user-info">
            <img src={question.author.avatar} alt={question.author.name} />
            <span>{question.author.name}</span>
        </div>
        <div className="likes">
          <p>{16}</p>
          <img src={likeImg} alt="like icon" />
        </div>
      </div>
    </div>
  )
}
