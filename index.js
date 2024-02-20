const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = "adc2826620a8e171a44f7e74eb5db860";
const baseUrl = "http://api.scraperapi.com?api_key=${apiKey}&autoparse=true";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Amazon Product scrapper API");
});

// GET account details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/&{productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json({ message: error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
