import React from 'react'
import deleteIcon from '../../assets/images/deleteIcon.svg';
import useTheme from '../../hooks/useTheme';
import useConfirm from '../../hooks/useConfirm';
import './styles.scss';

type ClosedAtProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  iconRef: string,
  title: string,
  text: string,
}

export default function ConfirmationModal() {  
  const { theme } = useTheme();
  const {isOpen, iconRef, proceed, prompt, title, onlyConfirm } = useConfirm();

  if (isOpen) return (
    <div></div>
    // <div className={`modal-container ${theme}`} onClick={handleClick}>
    //   <div className="modal-content" onClick={event => event.stopPropagation()}>
    //     <img src={iconRef} alt="" />
    //     <h2>{title}</h2>
    //     <p>{text}</p>

    //     <button onClick={handleClick}>Ok</button>
    //   </div>
    // </div>
  ) 

  return null;
}
