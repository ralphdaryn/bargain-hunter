import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";

const App = () => {
  const [deals, setDeals] = useState([]);
  const getDeals = async () => {
    try {
      const response = await axios.get("http://localhost:5050/deals");
      setDeals(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  console.log(deals);

  return (
    <div className="app">
      <Header />
      <div>
        <h2>Best Bargain!</h2>
        <div className="feed">
          {deals.map((deal) => (
            <Card key={deal.pos} item={deal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
