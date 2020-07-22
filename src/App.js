// componente inicial da aplicação
import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
import Routes from './routes';

// sempre que for incluir um codigo javascript dentro dohtml usa {}
function App() {
  return (
    // colocando a logo no site
    <div className = "container">
      <img src={logo} alt = "AirCnC" />

      <div className = "content">
        <Routes></Routes>
        
      </div>
    </div>
  );
}

export default App;
