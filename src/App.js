import "./App.scss";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import SearchContext from "./components/SearchContext/SearchContext";

const App = () => {
  const [deals, setDeals] = useState([]);
  const [sortItems, setSortItems] = useState(false);
  const { query } = useContext(SearchContext);
  const [filterBestSeller, setFilterBestSeller] = useState(false);
  const [filterTopReviews, setFilterTopReviews] = useState(false);

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

  let displayedDeals = [...deals];

  if (filterBestSeller) {
    displayedDeals = displayedDeals.filter((deal) => deal.best_seller);
  } else if (filterTopReviews) {
    displayedDeals = displayedDeals
      .sort((a, b) => b.reviews_count - a.reviews_count)
      .filter((deal) => deal.reviews_count > 0);
  }

  const sortedDeals = sortItems
    ? [...displayedDeals].sort((a, b) => b.price - a.price)
    : [...displayedDeals].sort((a, b) => a.price - b.price);

  const calculateDiscount = (originalPrice, discountPrice) => {
    const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const handleBestSellerClick = () => {
    setFilterBestSeller(true);
    setFilterTopReviews(false);
  };

  const handleTopReviewsClick = () => {
    setFilterTopReviews(true);
    setFilterBestSeller(false);
  };

  return (
    <Router>
      <div className="app">
        <Header
          onBestSellerClick={handleBestSellerClick}
          onTopReviewsClick={handleTopReviewsClick}
        />
        <div className="app__controls">
          <button
            className="app__sort-button"
            onClick={() => setSortItems(!sortItems)}
          >
            {sortItems
              ? "Sort Price: Highest to Lowest"
              : "Sort Price: Lowest to Highest"}
          </button>
        </div>
        <div className="app__feed">
          {sortedDeals.map((deal) => (
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
