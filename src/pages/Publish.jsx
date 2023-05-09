// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropZone from "../components/Dropzone";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Publish() {
  const [pictures, setPictures] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: "",
    exchange: false,
  });

  console.log(pictures);
  const token = Cookies.get("Vinted");

  const handleChange = (event) => {
    const detailsClone = { ...details };
    if (event.target.name === "exchange") {
      detailsClone[event.target.name] = !details.exchange;
    } else {
      detailsClone[event.target.name] = event.target.value;
    }
    setDetails(detailsClone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", details.title);
      formData.append("description", details.description);
      formData.append("brand", details.brand);
      formData.append("size", details.size);
      formData.append("color", details.color);
      formData.append("condition", details.condition);
      formData.append("city", details.city);
      formData.append("price", details.price);
      formData.append("exchange", details.exchange);
      formData.append("picture", pictures);

      // // Parcourir le tableau des images et les ajouter à formData
      // pictures.forEach((picture, index) => {
      //   formData.append(`pictures[${index}]`, picture);
      // });

      // Vérifier le contenu du formData
      console.log("FormData content:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(pictures);

  return (
    <form className="publish container" onSubmit={handleSubmit}>
      <p>Vends ton article</p>
      <section className="center pictures ">
        <div className="center preview">
          <DropZone setPictures={setPictures} />
        </div>
      </section>

      <section className="center">
        <div className="line underline">
          <p>Titre</p>
          <input
            type="text"
            placeholder="ex. Chemise Sézane verte"
            className="undeline"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="line">
          <p>Décris ton article</p>
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="ex. Porté quelques fois, taille correctement"
            onChange={handleChange}
          ></textarea>
        </div>
      </section>

      <section className="center">
        <div className="line underline">
          <p>Marque</p>
          <input
            type="text"
            placeholder="ex. Zara"
            name="brand"
            onChange={handleChange}
          />
        </div>
        <div className="line underline">
          <p>Taille</p>
          <input
            type="text"
            placeholder="ex. L /40 / 12"
            className="undeline"
            name="size"
            onChange={handleChange}
          />
        </div>
        <div className="line underline">
          <p>Couleur</p>
          <input
            type="text"
            placeholder="ex. Fushia"
            className="undeline"
            name="color"
            onChange={handleChange}
          />
        </div>
        <div className="line underline">
          <p>Etat</p>
          <input
            type="text"
            placeholder="Neuf avec étiquette"
            className="undeline"
            name="condition"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <p>Lieu</p>
          <input
            type="text"
            placeholder="ex. Paris"
            className="undeline"
            name="city"
            onChange={handleChange}
          />
        </div>
      </section>
      <section className="center">
        <div className="line">
          <p>Prix</p>
          <input
            type="text"
            placeholder="0.00€"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="check">
          <div></div>
          <label>
            <input type="checkbox" name="exchange" onChange={handleChange} />
            Je suis intérréssé(e) par les échanges
          </label>
        </div>
      </section>
      <div className="submit">
        <button type="submit">Ajouter</button>
      </div>
    </form>
  );
}
