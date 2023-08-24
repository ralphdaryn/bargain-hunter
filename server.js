const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());

// Username / Password
const username = "bargainhunter";
const password = "BargainHunter06";

// Routes
app.get("/deals", async (req, res) => {
  try {
    const body = {
      source: "amazon_search",
      query: "deals today",
      parse: true,
      pages: 1,
    };

    const response = await axios.post(
      "https://realtime.oxylabs.io/v1/queries",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${username}:${password}`).toString("base64"),
        },
      }
    );

    const results = response.data.results[0].content.results.organic;

    const filterDeals = results.filter((deal) => deal.price_strikethrough);

    const sortDeal = filterDeals.sort(
      (b, a) =>
        ((a.price_strikethrough - a.price) / a.price_strikethrough) * 100 -
        ((b.price_strikethrough - b.price) / b.price_strikethrough) * 100
    );

    res.json(sortDeal);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
