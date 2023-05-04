import { useState } from "react";
import "./signUp.scss";
import axios from "axios";
import Cookies from "js-cookie";

export default function Index({ setVisible, setLogin, isLog, setIsLog }) {
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleChange = (event) => {
    console.log(Boolean(user.newsletter));
    const userClone = { ...user };
    if (event.target.type === "checkbox") {
      userClone[event.target.name] = !user.newsletter;
    } else {
      userClone[event.target.name] = event.target.value;
    }
    setUser(userClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsClone = { ...errors };
    if (!user.username) {
      errorsClone.username = true;
      setErrors(errorsClone);
      return;
    } else if (!user.email) {
      errorsClone.username = false;
      errorsClone.email = true;
      setErrors(errorsClone);
      return;
    } else if (!user.password) {
      errorsClone.email = false;
      errorsClone.password = true;
      setErrors(errorsClone);
      return;
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          user
        );
        console.log(response.data.token);
        Cookies.set("Vinted", response.data.token, { expires: 7 });
        setIsLog(true);
        setVisible(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          className={errors.username ? "inputSignUp inputError" : "inputSignUp"}
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={handleChange}
          value={user.userName}
        />
        {errors.username && (
          <p className="error">Merci de saisir votre nom d'utilisateur</p>
        )}
        <input
          className={errors.email ? "inputSignUp inputError" : "inputSignUp"}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        {errors.email && <p className="error">Merci de saisir votre Email</p>}
        <input
          className={errors.password ? "inputSignUp inputError" : "inputSignUp"}
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          value={user.password}
        />
        {errors.password && (
          <p className="error">Merci de saisir un mot de passe</p>
        )}

        <div className="newsletter">
          <label>
            <input
              type="checkbox"
              name="newsletter"
              onChange={handleChange}
              checked={user.newsletter}
            />
            S'inscrire à notre newsletter
          </label>
          <p className="cgu">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button className="btn-2 signUp" type="submit">
          S'inscrire
        </button>
        <button
          onClick={() => {
            setLogin(true);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </button>
      </form>
    </div>
  );
}
