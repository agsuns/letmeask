import React from 'react';

export default function useWindowWidth() {  
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  })

  return windowWidth;
}