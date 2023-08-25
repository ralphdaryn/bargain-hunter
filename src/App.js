import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";

const App = () => {

  const [deals, setDeals] = useState([]);

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

  return (
    <div className="app">
      <Header />
      <div>
        <h2>Top Bargains Today!</h2>
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
