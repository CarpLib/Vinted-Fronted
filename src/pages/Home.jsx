import Main from "../components/Main";
import hero from "../assets/hero.jpg";
import overlay from "../assets/overlay.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ range, search, sort }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${range[0]}&priceMax${range[1]}&sort=price-${sort}`
        );
        console.log(response);
        setData(response.data);
        setIsLoading(true);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [search, range, sort]);

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
