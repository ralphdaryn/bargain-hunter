import "./App.scss";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import SearchContext from "./components/SearchContext/SearchContext";

const App = () => {
  const [deals, setDeals] = useState([]);
  const [sortItems, setSortItems] = useState(null);
  const { query } = useContext(SearchContext);
  const [filterBestSeller, setFilterBestSeller] = useState(false);
  const [filterTopReviews, setFilterTopReviews] = useState(false);
  const [filterHighestRated, setFilterHighestRated] = useState(false);

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

  const calculateDiscount = (originalPrice, discountPrice) => {
    const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  let displayedDeals = [...deals];

  if (filterBestSeller) {
    displayedDeals = displayedDeals.filter((deal) => deal.best_seller);
  } else if (filterTopReviews) {
    displayedDeals = displayedDeals
      .filter((deal) => deal.reviews_count > 100)
      .sort((a, b) => b.reviews_count - a.reviews_count);
  } else if (filterHighestRated) {
    displayedDeals = displayedDeals.sort((a, b) => b.rating - a.rating);
  }

  if (sortItems === true) {
    displayedDeals.sort((a, b) => b.price - a.price);
  } else if (sortItems === false) {
    displayedDeals.sort((a, b) => a.price - b.price);
  }

  const handleBestSellerClick = () => {
    setFilterBestSeller(true);
    setFilterTopReviews(false);
    setFilterHighestRated(false);
  };

  const handleTopReviewsClick = () => {
    setFilterTopReviews(true);
    setFilterBestSeller(false);
    setFilterHighestRated(false);
  };

  const handleHighestRatedClick = () => {
    setFilterHighestRated(true);
    setFilterBestSeller(false);
    setFilterTopReviews(false);
  };

  return (
    <Router>
      <div className="app">
        <Header
          onBestSellerClick={handleBestSellerClick}
          onTopReviewsClick={handleTopReviewsClick}
          onHighestRatedClick={handleHighestRatedClick}
        />
        <div className="app__controls">
          <h1 className="app__title">Today's Bargain!</h1>
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
          {displayedDeals.map((deal) => (
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
