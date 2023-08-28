import "./Card.scss";

const Card = ({ item }) => {
  const titleFormat = item.title.slice(0, 50);
  const shippingFormat = item.shipping_information.slice(0, 25);
  console.log(item);
  const renderRating = () => {
    return item.rating === 0 ? "No ratings available!" : item.rating;
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <img className="card__image" src={item.url_image} alt={item.title} />
      </div>
      <div className="card__container">
        <h2 className="card__title">
          <a className="card__link"
            href={`http://www.amazon.com/${item.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {titleFormat}...
          </a>
        </h2>
        <div className="card__wrapper">
          <p className="card__rating">{renderRating()}</p>
          <p>|</p>
          <p className="card__reviews">{item.reviews_count} reviews</p>
        </div>
        <h3 className="card__price">${item.price}</h3>
        <p className="card__shipping">{shippingFormat}...</p>
      </div>
    </div>
  );
};
export default Card;
