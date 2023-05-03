import Offer from "../Offer";
import "./main.scss";

export default function index({ data }) {
  //   console.log(data.offers);

  return (
    <main>
      <div className="container">
        <div className="listOffer">
          {data.offers?.map((offer) => {
            // console.log(offer);
            return <Offer key={offer._id} offer={offer} />;
          })}
        </div>
      </div>
    </main>
  );
}
