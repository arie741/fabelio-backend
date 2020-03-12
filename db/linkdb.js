const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const getProductLinks = "select * from product_links";
const putProductLinks = "insert into product_links(uuid, link, name, description, images, current_price, price_updated_time) values($1, $2, $3, $4, $5, $6, current_timestamp)";
const getProductDetailByUuid = "select * from product_links where uuid = $1";
const updateProductPrice = "update product_links set (updated_price, price_updated_time) = ($1, current_timestamp) where uuid = $2";
const deleteProductByUuid = "delete from product_links where uuid = $1";

module.exports = {
	query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
  getProductLinks,
  putProductLinks,
  getProductDetailByUuid,
  updateProductPrice,
  deleteProductByUuid
}