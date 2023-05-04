import "./modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "../Signup";
import Login from "../Login";

export default function index({
  setVisible,
  visible,
  login,
  setLogin,
  isLog,
  setIsLog,
}) {
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="btnClose"
          onClick={() => {
            setVisible(false);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <div className="contentModal">
          {login ? (
            <Login
              login={login}
              setLogin={setLogin}
              setVisible={setVisible}
              isLog={isLog}
              setIsLog={setIsLog}
            />
          ) : (
            <SignUp
              login={login}
              setLogin={setLogin}
              visible={visible}
              setVisible={setVisible}
              isLog={isLog}
              setIsLog={setIsLog}
            />
          )}
        </div>
      </div>
    </div>
  );
}
