import "./payment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Index({ setPaymentModal, paymentModal }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    console.log(stripeResponse.token.id);
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: "Le titre de l'annonce",
        amount: 1000,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div
      className="payment-root "
      onClick={() => {
        setPaymentModal(false);
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
            setPaymentModal(false);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
        </button>
        <div className="contentModal">
          {!completed ? (
            <form onSubmit={handleSubmit}>
              <h1>Formulaire de Paiement</h1>
              <p>Aucun numero de carte n'est conservé en base de donnée</p>
              <CardElement className="formPay" />
              <div className="buy">
                <button type="submit">Valider</button>
              </div>
            </form>
          ) : (
            <div className="done">
              <span>Paiement effectué ! </span>
              <button
                onClick={() => {
                  setPaymentModal(!paymentModal);
                  navigate("/");
                }}
              >
                Retour Accueil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
