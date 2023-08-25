const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());

// Authorization
const username = "bargainhunter";
const password = "BargainHunter06";

// Routes
app.get("/deals", (req, res) => {
  const body = {
    source: "amazon_search",
    query: "deals today",
    parse: true,
    pages: 1,
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
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
