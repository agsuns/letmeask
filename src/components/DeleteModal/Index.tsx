import React from 'react';
import garbageCan from '../../assets/images/garbageCan.svg';
import './styles.scss'
import { DeleteModalProps } from '../../models/deleteModals';

interface DeleteRoomProps extends DeleteModalProps{
  imgRef: string,
  title: string,
  paragraph: string,  
  acceptButtonText: string,
}

export default function DeleteModal(props : DeleteRoomProps) {  
  
  if(!props.show) return null;

  return (
    <div className="modal-container" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
          <img src={props.imgRef} alt="delete" />
          <h2>{props.title}</h2>
          <p>{props.paragraph}</p>

          <div className="footer">            
            <button className="cancel" onClick={props.onClose}>Cancelar</button>
            <button className="accept" onClick={() => {props.onDelete(); props.onClose()}}>{props.acceptButtonText}</button>
          </div>
      </div>  
    </div>
  )
}
