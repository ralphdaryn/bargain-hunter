import "./App.scss";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import SearchContext from "./components/SearchContext/SearchContext";

const App = () => {
  const [deals, setDeals] = useState([]);
  const [sortItems, setSortItems] = useState(false);
  const { query } = useContext(SearchContext);

  const getDeals = (searchQuery) => {
    axios
      .get(`http://localhost:5050/deals?query=${searchQuery}`)
      .then((response) => {
        setDeals(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDeals(query);
  }, [query]);

  const sortDeals = sortItems
    ? [...deals].sort((a, b) => a.price - b.price)
    : deals;

  const calculateDiscount = (originalPrice, discountPrice) => {
    const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app__controls">
          <button
            className="app__sort-button"
            onClick={() => setSortItems(!sortItems)}
          >
            {sortItems
              ? "Sort Price: Lowest to Highest"
              : "Sort Price: Highest to Lowest"}
          </button>
        </div>
        <div className="app__feed">
          {sortDeals.map((deal) => (
            <Card
              key={deal.pos}
              item={deal}
              discount={calculateDiscount(deal.price_strikethrough, deal.price)}
            />
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;
