import "./offer.scss";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default function index({ offer }) {
  console.log(offer);

  return (
    <Link to={`/offer/${offer._id}`}>
      <div className="offer">
        <div className="owner">
          {offer.owner.account.avatar ? (
            <img
              src={offer.owner.account.avatar.secure_url}
              alt="avatar du vendeur"
            />
          ) : (
            ""
          )}
          {offer.owner.account.username && (
            <p>{offer.owner.account.username}</p>
          )}
        </div>
        <img
          className="productPicture"
          src={offer.product_image.url}
          alt="représentation du produit"
        />
        <div className="description">
          <span className="price">{offer.product_price} €</span>
          {offer.product_details
            .slice(0)
            .reverse()
            .map((details) => {
              const keyBrand = uuid();
              const keySize = uuid();
              return (
                <>
                  {details.TAILLE && (
                    <span key={keySize} className="size">
                      {details.TAILLE}
                    </span>
                  )}
                  {details.MARQUE && (
                    <span key={keyBrand} className="brand">
                      {details.MARQUE}
                    </span>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </Link>
  );
}
