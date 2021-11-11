
import './styles/global.scss'
import { AuthContextProvider } from './contexts/AuthContext';
import  ConfirmContextProvider  from './contexts/ConfirmContext';
import ThemeContextProvider from './contexts/ThemeContext';
import Routes from './routes';
import DeleteModal from './components/DeleteModal/Index';

export function App() {
  
  return (    
    <ConfirmContextProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <DeleteModal/>        
          <Routes/>
        </AuthContextProvider>
      </ThemeContextProvider>
    </ConfirmContextProvider>
  );
}
