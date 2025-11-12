import db from "../connection.js";

export const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.json(err);
    res.json(results);
  });
};

export const addProduct = (req, res) => {
  const { title, description, price, image, category } = req.body;
  const sql = "INSERT INTO products (title, description, price, image, category) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, description, price, image, category], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Product added", id: result.insertId });
  });
};
