import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Offer({
  paymentModal,
  setPaymentModal,
  isLog,
  setVisible,
  visible,
}) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // console.log(paymentModal);

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const response = await axios(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setProduct(response.data);
        setIsLoading(true);
      };
      fetchProduct();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // console.log(product);
  return (
    <>
      {isLoading && (
        <section>
          <div className="blockOffer">
            <Carousel
              responsive={responsive}
              className="carousel"
              infinite={true}
            >
              {product.product_pictures.map((picture) => {
                return (
                  <img
                    key={picture.asset_id}
                    src={picture.url}
                    alt="vetement"
                  />
                );
              })}
            </Carousel>
            <div className="descriptionProduct">
              <span className="price">{product.product_price} €</span>

              <div className="detailsArticle">
                {product.product_details.map((details, index) => {
                  const keyName = Object.keys(details);

                  return (
                    <div key={index} className="details">
                      <span>{keyName} : </span>
                      <span>{details[keyName]}</span>
                    </div>
                  );
                })}
              </div>
              <p className="articleName">{product.product_name} </p>
              <p className="description">{product.product_description}</p>
              <div className="avatar">
                {product.owner.account.avatar && (
                  <img src={product.owner.account.avatar.secure_url} alt="" />
                )}

                <p>{product.owner.account.username}</p>
              </div>
              <div className="buy">
                <button
                  onClick={() => {
                    isLog
                      ? setPaymentModal(!paymentModal)
                      : setVisible(!visible);
                  }}
                >
                  Acheter
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
