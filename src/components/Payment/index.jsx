import "./payment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function index({ setVisible, visible, isLog, setIsLog }) {
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
        <div className="contentModal"></div>
      </div>
    </div>
  );
}
