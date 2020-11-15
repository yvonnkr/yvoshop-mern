const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/api/products", async (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
