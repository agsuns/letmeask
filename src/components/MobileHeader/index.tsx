import React from 'react'
import burgerMenu from '../../assets/images/burger-menu.svg';
import whiteBurgerMenu from '../../assets/images/white-burger-menu.svg';
import useTheme from '../../hooks/useTheme';
import logo from '../../assets/images/logo.svg';
import whiteLogo from '../../assets/images/white-logo.svg';
import './styles.scss';
import { useHistory } from 'react-router';

interface MobileHeaderProps {  
  children: React.ReactNode
}

export default function MobileHeader({children}: MobileHeaderProps) {
  const { theme } = useTheme();
  const history = useHistory();
  const [showSidenav, setShowSidenav] = React.useState(false);
  const handleBurgerMenu = () => {
    setShowSidenav(prev => !prev);
  }

  return (

    <header className='mobile-header'>
      <nav>
        <img className='logo' src={theme === 'light' ? logo : whiteLogo} alt="letmeask logo" onClick={() => history.push('/')}/>
        <button onClick={handleBurgerMenu}>
          <img src={theme === 'light' ? burgerMenu : whiteBurgerMenu} alt="" />
        </button>
      </nav>
      {showSidenav ? (
        <div className="side-nav-container" onClick={handleBurgerMenu}>  
        <div className="sidenav-content" onClick={event => event.stopPropagation()}>
          <nav>
            <img className='logo' src={theme === 'light' ? logo : whiteLogo} alt="letmeask logo" onClick={() => history.push('/')}/>
            <button onClick={handleBurgerMenu}>
              <img src={theme === 'light' ? burgerMenu : whiteBurgerMenu} alt="" />
            </button>
          </nav>

          <div className="options-container">
            {children}
          </div>

        </div>
      </div>
      ) : null}      
  </header>
  )
}
