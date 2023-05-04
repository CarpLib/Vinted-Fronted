import "./header.scss";
import logo from "../../assets/logo.svg";
import Cookies from "js-cookie";

export default function Header({
  visible,
  setVisible,
  login,
  setLogin,
  isLog,
  setIsLog,
}) {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="" />
        <div className="search">
          <input type="text" placeholder="Rechercher des articles" />
          {/* <div className="prefSearch">
            <div className="trie">
              <label>
                <span>Trier les prix : </span>
                <input type="checkbox" />
              </label>
            </div>
            <div>Prix entre</div>
          </div> */}
        </div>
        <div className="buttons">
          {!isLog ? (
            <div className="blocLog">
              <button
                className="btn-1"
                onClick={() => {
                  setLogin(false);
                  setVisible(!visible);
                }}
              >
                S'inscrire
              </button>
              <button
                className="btn-1"
                onClick={() => {
                  setLogin(true);
                  setVisible(!visible);
                }}
              >
                Se connecter
              </button>
            </div>
          ) : (
            <div className="blocLog">
              <button
                className="btn-3"
                onClick={() => {
                  Cookies.remove("Vinted");
                  setIsLog(false);
                }}
              >
                Se Déconnecter
              </button>
            </div>
          )}

          <button className="btn-2">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
}
