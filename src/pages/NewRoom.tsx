import { Button } from '../components/Button';
import '../styles/global.css';
import '../styles/new-room.css';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

export function NewRoom() {
    return (
        <div className="container">
            <aside>
                <img src={illustrationImg} alt="ilustração que simboliza perguntas e respostas" />
                <h2>Toda pergunta tem uma resposta.</h2>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>

            <main>
                {/* só pra centralizar */}
                <div className='main-content'>                    
                    <img id="home-logo" src={logoImg} alt="letmeask" />
                    <h2>Crie uma nova sala</h2>
                    
                    <form>
                        <input 
                            type="text" 
                            placeholder='Nome da sala'
                        />
                        <Button type="submit">Criar sala</Button> 
                    </form>

                    <p>Quer entrar em uma sala existente? <a href="">Clique aqui</a></p>
                </div>
            </main>
        </div>
    );
}