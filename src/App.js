import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";

const App = () => {
  const [deals, setDeals] = useState([]);
  const [sortItems, setSortItems] = useState(false);

  const getDeals = () => {
    axios
      .get("http://localhost:5050/deals")
      .then((response) => {
        setDeals(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDeals();
  }, []);

  const sortDeals = sortItems
    ? [...deals].sort((a, b) => a.price - b.price)
    : deals;

  const calculateDiscount = (originalPrice, discountPrice) => {
    const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <div className="app">
      <Header />
      <div>
        <h2>Top Bargains Today!</h2>
        <button onClick={() => setSortItems(!sortItems)}>
          {sortItems ? "Sort: Highest to Lowest" : "Sort: Lowest to Highest"}
        </button>
        <div className="feed">
          {sortDeals.map((deal) => (
            <Card
              key={deal.pos}
              item={deal}
              discount={calculateDiscount(deal.price_strikethrough, deal.price)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
