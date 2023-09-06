import "./Card.scss";
import { FaStar } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";

const Card = ({ item, discount }) => {
  const titleFormat = item.title.slice(0, 50);
  const shippingFormat =
    item.shipping_information?.slice(0, 20) || "Free Shipping";

  const renderRating = () => {
    return item.rating === 0 ? "Be the first to rate!" : `${item.rating}`;
  };

  const renderReviews = () => {
    return item.reviews_count === 0
      ? "Be the first to review!"
      : `${item.reviews_count} reviews`;
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <img className="card__image" src={item.url_image} alt={item.title} />
      </div>
      <div className="card__content">
        <div className="card__title-container">
          <h2 className="card__title">
            <a
              className="card__link"
              href={`http://www.amazon.com/${item.url}`}
              target="_blank"
              rel="noreferrer"
            >
              {titleFormat}...
            </a>
          </h2>
        </div>
        <div className="card__info">
          <p className="card__rating">
            {renderRating()}
            <FaStar className="card__rating-icon" />
          </p>
          <p className="card__reviews">
            {renderReviews()}
            <FaCommentDots className="card__reviews-icon" />
          </p>
        </div>
        <div className="card__price-info">
          <div>
            <p className="card__discount">Reg price:</p>
            <span className="card__discount-strike">
              ${item.price_strikethrough}
            </span>
          </div>
          <h3 className="card__price">${item.price}</h3>
          <div>
            <p className="card__save">Save {discount}%</p>
          </div>
        </div>
        <div>
          <p className="card__sales">{item.sales_volume} </p>
        </div>
        <p className="card__shipping">
          {shippingFormat}...
          <FaShippingFast />
        </p>
      </div>
    </div>
  );
};

export default Card;
