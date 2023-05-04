import "./login.scss";
export default function index({ setLogin }) {
  return (
    <div className="login">
      <div className="form">
        <h1>Se Connecter</h1>

        <input className="inputLogin" type="email" placeholder="Email" />
        <input
          className="inputLogin"
          type="password"
          placeholder="Mot de passe"
        />

        <button className="btn-2 login">S'inscrire</button>
        <button
          onClick={() => {
            setLogin(false);
          }}
        >
          Pas encore de compte ? Inscris-toi !
        </button>
      </div>
    </div>
  );
}
