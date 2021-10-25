import React from 'react';
import { FormEvent } from 'react';
import { Button } from '../../components/Button/Index';
import { Link } from 'react-router-dom';
import '../../styles/global.scss';
import './styles.scss';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { useHistory } from 'react-router';

export function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = React.useState('');
    const history = useHistory();

    const handleCreateRoom = async (event: FormEvent) => {
        event.preventDefault();        

        // se o input passado pelo usuario for vazio, ou só conter espaços, a sala não será criada
        if(newRoom.trim() === '') return;

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,             
        })        

        history.push(`${firebaseRoom.key}`);
    }



    return (
        //  pode-se usar isso no lugar de uma div, porem nenhum elemento vai encapsular o q vem logo abaixo
        <React.Fragment>
            <div className="new-room-container">
                <aside>
                    <img src={illustrationImg} alt="ilustração que simboliza perguntas e respostas" />
                    <h2>Toda pergunta tem uma resposta.</h2>
                    <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
                </aside>

                <main>
                    {/* só pra centralizar */}
                    <div className='new-room-main-content'>                    
                        <img id="new-room-home-logo" src={logoImg} alt="letmeask" />                        
                        <h2>Crie uma nova sala</h2>
                        
                        <form onSubmit={handleCreateRoom}>
                            <input 
                                type="text" 
                                placeholder='Nome da sala'
                                onChange={(event) => setNewRoom(event.target.value)}
                            />
                            <Button type="submit">Criar sala</Button> 
                        </form>

                        <p>
                            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                        </p>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}