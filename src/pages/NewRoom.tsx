import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/new-room.css';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
    const { user } = useAuth();
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
                        
                        <form>
                            <input 
                                type="text" 
                                placeholder='Nome da sala'
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