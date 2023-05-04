import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Offer() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const response = await axios(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
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
      <Header />
      {isLoading && (
        <section>
          <Carousel
            responsive={responsive}
            className="carousel"
            infinite={true}
          >
            {product.product_pictures.map((picture) => {
              console.log(picture);

              return (
                <img key={picture.asset_id} src={picture.url} alt="vetement" />
              );
            })}
          </Carousel>
          <div className="descriptionProduct">
            <span className="price">{product.product_price} €</span>
            <div>
              <div>
                {product.product_details.map((details) => {
                  return <>{details.MARQUE && <span> MARQUE</span>}</>;
                })}
              </div>
            </div>
            <p>{product.product_name} </p>
          </div>
        </section>
      )}
    </>
  );
}
