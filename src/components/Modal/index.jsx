import "./modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function index({ setVisible, model }) {
  console.log(model);
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
        {/* button pour fermer la modal */}
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <h1>{model.title}</h1>
        <input
          type={model.input1.type}
          placeholder={model.input1.placeholder}
        />
        <input
          type={model.input2.type}
          placeholder={model.input2.placeholder}
        />
        {model.input3 && (
          <input type={model.input3} placeholder={model.input3.placeholder} />
        )}
      </div>
    </div>
  );
}
