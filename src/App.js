import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import DoubleRangeSlider from "./components/DoubleRangeSlider/DoubleRangeSlider";
import "./App.scss";

const App = () => {
  const [deals, setDeals] = useState([]);
  const [sortItems, setSortItems] = useState(false);
  // const [priceRange, setPriceRange] = useState([20, 80]);

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

  // const handlePriceRangeChange = (newRange) => {
  //   setPriceRange(newRange);
  //   // Perform any filtering based on the new price range here
  // };

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app__controls">
          {/* <DoubleRangeSlider/> */}
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
