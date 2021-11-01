import React from 'react';
import './styles.scss';
import { ClientQuestion } from '../../models/question';

interface QuestionProps {
  question: ClientQuestion, 
  children?: React.ReactNode
}

export default function QuestionBox({question, children}: QuestionProps) {  


  return (
    <div className={
      `question-container 
      ${question.isHighlighted ? 'highlighted' : ''}
      ${question.isAnswered ? 'answered' : ''}`}
    >
      <p className="question-content">
        {question.content}
      </p>

      <div className="info">
        <div className="user-info">
            <img src={question.author.avatar} alt={question.author.name} referrerPolicy="no-referrer"/>
            <span>{question.author.name}</span>
        </div>
        <div className="functionalities">
          {children}          
        </div>
      </div>
    </div>
  )
}
