import { useState } from "react";
import "./login.scss";
import axios from "axios";
import Cookies from "js-cookie";
export default function Index({ setLogin, setVisible, setIsLog }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (event) => {
    const userClone = { ...user };
    userClone[event.target.name] = event.target.value;
    setUser(userClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsClone = { ...errors };
    if (!user.email) {
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
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          user
        );
        console.log(response.data);
        const token = Cookies.get("Vinted");
        if (token) {
          Cookies.remove("Vinted");
          Cookies.set("Vinted", response.data.token, { expires: 7 });
        } else {
          Cookies.set("Vinted", response.data.token, { expires: 7 });
        }
        setIsLog(true);
        setVisible(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Se Connecter</h1>

        <input
          className={errors.email ? "inputLogin inputError" : "inputLogin"}
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={user.email}
        />
        {errors.email && (
          <p className="error">Merci de renseigner votre email</p>
        )}
        <input
          className={errors.password ? "inputLogin inputError" : "inputLogin"}
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="error">Merci de renseigner votre mot de passe</p>
        )}

        <button className="btn-2 login" type="submit">
          S'inscrire
        </button>
        <button
          onClick={() => {
            setLogin(false);
          }}
        >
          Pas encore de compte ? Inscris-toi !
        </button>
      </form>
    </div>
  );
}
