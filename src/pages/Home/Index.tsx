import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Index';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import whiteLogo from '../../assets/images/white-logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import '../../styles/global.scss';
import './styles.scss';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { FirebaseRoom } from '../../models/room';
import useTheme from '../../hooks/useTheme';
import NotificationModal from '../../components/NotificationModal';

export function Home() {
    const [closedAtModal, setClosedAtModal] = React.useState(false);
    const [closedAtValue, setClosedAtValue] = React.useState<Date>();
    const [noRoomModal, setNoRoomModal] = React.useState(false);
    const [wrongInputModal, setWrongInputModal] = React.useState(false);

    const { theme } = useTheme();
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = React.useState('');

    const handleGoogleSignIn = async () => {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    const handleJoinRoom = async (event: React.FormEvent) => {

        event.preventDefault();

        if(roomCode.trim() === '') return;
        if(roomCode.match(/[\/#$\[\]\.]/)) {
            setWrongInputModal(true);
            return;
        }

        const roomSnapshot = await database.ref(`rooms/${roomCode}`).get();

        if (!roomSnapshot.exists()) {
            setNoRoomModal(true);
            return;
        }

        const roomValue = roomSnapshot.val() as FirebaseRoom;
        if (roomValue?.closedAt) {
            setClosedAtValue(new Date(roomValue?.closedAt));
            setClosedAtModal(true);
            return;
        }

        if (roomValue.authorId === user?.id) history.push(`admin/rooms/${roomCode}`);
        else {
            console.log("I'm here");
            history.push(`rooms/${roomCode}`);
        }
    }

    return (
        <>
            <NotificationModal
                isOpen={closedAtModal}
                setIsOpen={setClosedAtModal}
                iconRef={deleteIcon}
                title='Sala encerrada'
                text={`Sala encerrada em ${closedAtValue?.getDate()}/${(closedAtValue?.getMonth() ?? 0) + 1}/${closedAtValue?.getFullYear()}`}
            />

            <NotificationModal
                isOpen={noRoomModal}
                setIsOpen={setNoRoomModal}
                iconRef={deleteIcon}
                title="Esta sala não existe"
                text=''
            />

            <NotificationModal
                isOpen={wrongInputModal}
                setIsOpen={setWrongInputModal}
                iconRef={deleteIcon}
                title="Sala inválida"
                text="Insira somente caracteres válidos"
            />

            <div className={`home-container ${theme}`}>
                <aside>
                    <img src={illustrationImg} alt="ilustração que simboliza perguntas e respostas" />
                    <h2>Toda pergunta tem uma resposta.</h2>
                    <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
                </aside>

                <main>
                    {/* só pra centralizar */}
                    <div className='main-content'>
                        <img id="home-logo" src={theme === 'light' ? logoImg : whiteLogo} alt="letmeask" />
                        <button id="google-button" onClick={ handleGoogleSignIn }>
                            <img src={googleIconImg} alt="icone google"/>
                            Crie sua sala com o Google
                        </button>
                        <p>ou entre em uma sala</p>
                        <form onSubmit={handleJoinRoom}>
                            <input
                                type="text"
                                placeholder='Digite o código da sala'
                                onChange={event => setRoomCode(event.target.value)}
                                value={roomCode}
                            />

                            <Button type="submit">Entrar na sala</Button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}