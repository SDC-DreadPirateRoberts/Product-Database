const express = require('express');
const morgan = require('morgan');

const db = require('../database');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));

// get data on multiple product using count and query
app.get('/api/products/', (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 0;
  db.getManyProducts(count, page)
    .then((multipleProductInfo) => {
      res.send(multipleProductInfo.rows[0].array);
    })
    .catch(() => res.sendStatus(500));
});

// get data on one specific product number with features
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  db.getOneProduct(productId)
    .then((productInfo) => {
      res.send(productInfo.rows[0]);
    })
    .catch(() => res.sendStatus(500));
});

// get styles, pics and sku data for one specific product
app.get('/api/product/:productId/styles', (req, res) => {
  const { productId } = req.params;
  db.getStyles(productId)
    .then((styleInfo) => {
      res.send(styleInfo.rows[0]);
    })
    .catch(() => res.sendStatus(500));
});

// get all the products related to on specific product number
app.get('/api/product/:productId/related', (req, res) => {
  const { productId } = req.params;
  db.getRelated(productId)
    .then((relatedProducts) => {
      res.send(relatedProducts.rows[0].array);
    })
    .catch(() => res.sendStatus(500));
});

// get all the products currently in the cart
app.get('/api/cart', (req, res) => {
  db.getCart()
    .then((cartItems) => {
      res.send(cartItems.rows[0].array);
    })
    .catch(() => res.sendStatus(500));
});

// add a product to the cart
app.post('/api/cart', (req, res) => {
  const skuNum = req.body.sku_id;
  db.addToCart(skuNum)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// notice to the dev that we are listening
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
