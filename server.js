const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());

// Authorization
const username = process.env.SCRAPER_USERNAME;
const password = process.env.SCRAPER_PASSWORD;


// Deals Today Route
app.get("/deals", (req, res) => {
  const query = req.query.query || "today's deals";
  const body = {
    source: "amazon_search",
    domain: "com",
    query: query,
    start_page: 1,
    pages: 1,
    parse: true,
  };

  axios
    .post("https://realtime.oxylabs.io/v1/queries", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      },
    })
    .then((response) => {
      const results = response.data.results[0].content.results.organic;

      const filterDeals = results.filter((deal) => deal.price_strikethrough);

      const sortDeal = filterDeals.sort(
        (b, a) =>
          ((a.price_strikethrough - a.price) / a.price_strikethrough) * 100 -
          ((b.price_strikethrough - b.price) / b.price_strikethrough) * 100
      );

      res.json(sortDeal);
    })
    .catch((error) => {
      console.log(error.response);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
