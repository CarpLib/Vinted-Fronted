import "./header.scss";
import logo from "../../assets/logo.svg";

export default function Header() {
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
          <div className="blocLog">
            <button className="btn-1">S'inscrire</button>
            <button className="btn-1">Se connecter</button>
          </div>
          <button className="btn-2">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
}
