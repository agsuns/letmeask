import './styles.scss'
import useConfirm from '../../hooks/useConfirm';

export default function DeleteModal() {  
  const {title, prompt, iconRef, isOpen, cancel, proceed} = useConfirm();

  if(!isOpen) return null;

  return (
    <div className="modal-container" onClick={cancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
          <img src={iconRef} alt="delete" />
          <h2>{title}</h2>
          <p>{prompt}</p>

          <div className="footer">            
            <button className="cancel" onClick={cancel}>Cancelar</button>
            <button className="accept" onClick={proceed}>Sim</button>
          </div>
      </div>  
    </div>
  )
}
