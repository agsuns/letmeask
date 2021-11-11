import React from 'react'
import deleteIcon from '../../assets/images/deleteIcon.svg';
import useTheme from '../../hooks/useTheme';
import './styles.scss';

type ClosedAtProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  iconRef: string,
  title: string,
  text: string,
}

export default function NotificationModal({isOpen, setIsOpen, iconRef, title, text}: ClosedAtProps) {  
  const { theme } = useTheme();
  
  const handleClick = () => {
    setIsOpen(false);
  }

  if (isOpen) return (

    <div className={`modal-container ${theme}`} onClick={handleClick}>
      <div className="modal-content" onClick={event => event.stopPropagation()}>
        <img src={iconRef} alt="" />
        <h2>{title}</h2>
        <p>{text}</p>

        <button onClick={handleClick}>Ok</button>
      </div>
    </div>
  ) 

  return null;
}
