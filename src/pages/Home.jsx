import Main from "../components/Main";
import hero from "../assets/hero.jpg";
import overlay from "../assets/overlay.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(true);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <div className="hero">
        <img className="background" src={hero} alt="" />
        <img className="overlay" src={overlay} alt="" />
        <div className="startSell">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button className="btn-2">Commencer à vendre</button>
        </div>
      </div>
      {isLoading ? <Main data={data} /> : ""}
    </>
  );
}
