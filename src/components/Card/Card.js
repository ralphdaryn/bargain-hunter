const Card = ({ item }) => {
  console.log(item);
  return (
    <div className="card">
      <div className="card__container">
        <img src={item.url_image} alt={item.title} />
      </div>
      <div className="card__title">
        <h2>{item.title}</h2>
      </div>
    </div>
  );
};
export default Card;
