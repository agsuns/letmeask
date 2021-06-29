import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/global.css';
import '../styles/home.css'

export function Home() {
    const history = useHistory();

    function navigateToNewRoom() {
        history.push('/rooms/new');
    }

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
                    <button id="google-button" onClick={ navigateToNewRoom }>
                        <img src={googleIconImg} alt="icone google"/>
                        Crie sua sala com o Google
                    </button>
                    <p>ou entre em uma sala</p>
                    <form>
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                        />
                        <Button type="submit">Entrar na sala</Button> 
                    </form>
                </div>
            </main>
        </div>
    );
}