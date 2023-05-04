import "./header.scss";
import logo from "../../assets/logo.svg";
import Modal from "../Modal";
import { useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [modelModal, setModelModal] = useState({});
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
            <button
              className="btn-1"
              onClick={() => {
                setVisible(!visible);
                modelModal.title = "S'incrire";
                modelModal.input1 = {
                  type: "text",
                  placeholder: "Nom d'utilisateur",
                };
                modelModal.input2 = { type: "email", placeholder: "Email" };
                modelModal.input3 = {
                  type: "password",
                  placeholder: "Mot de passe",
                };
              }}
            >
              S'inscrire
            </button>
            <button
              className="btn-1"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Se connecter
            </button>
          </div>
          <button className="btn-2">Vends tes articles</button>
        </div>
      </div>
      {visible && <Modal setVisible={setVisible} model={modelModal} />}
    </header>
  );
}
