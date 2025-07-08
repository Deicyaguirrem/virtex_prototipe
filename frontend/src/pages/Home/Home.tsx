import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="top-right">
        <Link to="/login">
          <button className="home-button">Ingresar</button>
        </Link>
        <p className="register-link">Registrarse</p>
      </div>
      <div className="main-content">
        <img src="/vite.svg" alt="Logo" className="home-logo" />
        <h1>Bienvenido a Virtex</h1>
        <p>Tu plataforma de monitoreo inteligente</p>
      </div>
    </div>
  );
}

export default Home;
