const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

var fs = require("fs"); /* Put it where other modules included */
var products = JSON.parse(
  fs.readFileSync("./products.json", "utf8")
); /* Inside the get function */

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((c) => c._id === parseInt(req.params.id));
  if (!product)
    res.status(404).send("The product with the given ID was not found");
  res.send(product);
});

app.post("/products", (req, res) => {
  const product = {
    _id: products.length + 1,
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    rating: req.body.rating,
    warranty_years: req.body.warranty_years,
    available: req.body.available,
  };
  products.push(product);
  res.send(product);
});

app.put("/products/:id", (req, res) => {
  const product = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    rating: req.body.rating,
    warranty_years: req.body.warranty_years,
    available: req.body.available,
  };

  const objIndex = products.findIndex(
    (obj) => obj._id === parseInt(req.params.id)
  );
  products[objIndex] = { _id: +req.params.id, ...product };
  res.send(product);
});

app.delete("/products/:id", (req, res) => {
  const product = products.find((p) => p._id === parseInt(req.params.id));
  if (!product)
    res.status(404).send("The product with the given ID was not found");

  const index = products.indexOf(product);
  products.splice(index, 1);

  res.send(product);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
