import "./header.scss";
import logo from "../../assets/logo.svg";
import Cookies from "js-cookie";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Range from "../Range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({
  visible,
  setVisible,
  setLogin,
  isLog,
  setIsLog,
  range,
  setRange,
  search,
  setSearch,
  sort,
  setSort,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleValuesChange = (event) => {
    // console.log(range);
  };

  const handlePublish = () => {
    if (isLog) {
      navigate("offer/publish");
    } else {
      navigate("/");
      setLogin(true);
      setVisible(!visible);
    }
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="search">
          <input
            type="text"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            value={search}
          />
          {location.pathname === "/" && (
            <div className="prefSearch">
              <div className="trie">
                <span>Trier par prix :</span>
                <Switch
                  checkedChildren={
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                  }
                  unCheckedChildren={
                    <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                  }
                  onChange={(event) => {
                    // console.log(event);
                    if (event === true) {
                      setSort("desc");
                    } else {
                      setSort("asc");
                    }
                  }}
                />
              </div>
              <div className="range">
                <span>Prix entre :</span>
                <Range
                  onValuesChange={handleValuesChange}
                  range={range}
                  setRange={setRange}
                  className="Range"
                />
              </div>
            </div>
          )}
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

          <button
            className="btn-2"
            onClick={() => {
              handlePublish();
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
}
