import React from 'react';
import './styles.scss';
import useTheme from '../../hooks/useTheme';

export default function Loader() {
  const {theme} = useTheme();
  return (
    <div className={`loader-container ${theme}`}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
