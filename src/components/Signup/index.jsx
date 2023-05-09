import { useState } from "react";
import "./signUp.scss";
import axios from "axios";
import Cookies from "js-cookie";

export default function Index({ setVisible, setLogin, setIsLog }) {
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    conflit: false,
  });
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    newsletter: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    // console.log(event);
    const userClone = { ...user };
    if (event.target.type === "checkbox") {
      userClone[event.target.name] = !user.newsletter;
    } else if (event.target.type === "file") {
      setSelectedFile(event.target.files[0].name);
      userClone[event.target.name] = event.target.files[0];
    } else {
      userClone[event.target.name] = event.target.value;
    }
    setUser(userClone);
    console.log(user.avatar);
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
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("avatar", user.avatar);
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          formData
        );
        console.log(response.data);
        Cookies.set("Vinted", response.data.token, { expires: 7 });
        setIsLog(true);
        setVisible(false);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 409) {
          errorsClone.conflit = true;
          setErrors(errorsClone);
        }
      }
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <div className="avatar">
          <div className="customFileInputContainer">
            <label htmlFor="avatar" className="customFileButton">
              Choisir un fichier
            </label>
            <input
              id="avatar"
              type="file"
              className="customFileInput"
              name="avatar"
              onChange={handleChange}
            />
          </div>

          <div className="pictureBlock">
            {user.avatar && (
              <img
                className="avatarPicture"
                src={URL.createObjectURL(user.avatar)}
                alt="avatar de l'utilisateur"
              />
            )}

            {selectedFile && <span className="fileName">{selectedFile}</span>}
          </div>
        </div>

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
          className={
            errors.email || errors.conflit
              ? "inputSignUp inputError"
              : "inputSignUp"
          }
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
        {errors.conflit && (
          <p className="error">Cette adresse mail a déjà été utilisé</p>
        )}
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
