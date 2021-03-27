const pg = require('pg');
const pgConfig = require('./config.js');

const connection = new pg.Pool(pgConfig);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database');
  }
});

const getManyProducts = (count, page) => {
  const command = (
    `select array(
      ( SELECT row_to_json(x)
        FROM
          ( SELECT product_id AS id, name, slogan, description, catagory, default_price
            FROM products
          ) x
        ) LIMIT ($1) OFFSET ($2)
      );`
  );
  return connection.query(command, [count, 5 * page]);
};

const getOneProduct = (num) => {
  const command = (
    `SELECT p.product_id AS id, p.name, p.slogan, p.description, p.catagory, p.default_price,
      COALESCE(
        (
          SELECT array_to_json(array_agg(row_to_json(x)))
          FROM (
            SELECT f.feature, f.value
            FROM prod_feat_merge pf
            JOIN features f USING (feature_id)
            WHERE pf.product_id = p.product_id
          ) x
        ), '[]'
      ) AS features
    FROM products p WHERE product_id=($1);`
  );
  return connection.query(command, [num]);
};

const getStyles = (num) => {
  const command = (
    `SELECT p.product_id,
      ( SELECT array_agg(row_to_json(x)) FROM
        ( SELECT s.style_id, s.name, s.orig_price AS original_price, s.sale_price, s.def_style AS default,
          ( SELECT array_agg(row_to_json(x)) FROM
            ( SELECT ph.thumbnail_url, ph.url
              FROM pics ph WHERE ph.style_id = s.style_id
            ) x
          ) AS photos,
          ( SELECT json_object_agg(sk.sku_id,
            ( SELECT row_to_json(x)
              FROM
              ( SELECT quantity, size
                FROM skus where sku_id=sk.sku_id
              ) x
            )
          ) AS skus FROM skus sk WHERE sk.style_id = s.style_id
          ) FROM styles s WHERE s.product_id=p.product_id
        ) x
      ) AS results
    FROM products p WHERE p.product_id=($1);`
  );
  return connection.query(command, [num]);
};

const getRelated = (num) => {
  const command = (
    'SELECT ARRAY( SELECT other_product_id FROM related WHERE product_id=($1) );'
  );
  return connection.query(command, [num]);
};

const getCart = () => {
  const command = (
    'SELECT ARRAY( SELECT sku FROM cart );'
  );
  return connection.query(command);
};

const addToCart = (num) => {
  const command = (
    `INSERT INTO cart (sku) VALUES (${num});`
  );
  return connection.query(command);
};

module.exports = {
  getOneProduct,
  getStyles,
  getRelated,
  getManyProducts,
  getCart,
  addToCart,
};
