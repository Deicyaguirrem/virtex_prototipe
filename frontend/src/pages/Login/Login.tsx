import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form">
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
