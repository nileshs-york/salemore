import Database from "better-sqlite3";
const db = new Database("salemore.db");

const stmt = db.prepare(`
  UPDATE products SET 
    packaging_size = ?, 
    shape = ?, 
    packaging = ?, 
    color = ?, 
    per_piece_price = ?, 
    mrp = ?
  WHERE id = ?
`);

const products = db.prepare("SELECT id FROM products").all() as { id: number }[];

products.forEach(product => {
  stmt.run(
    "100g", 
    "Round", 
    "Plastic Bag", 
    "Red", 
    "₹5.00", 
    "₹10.00", 
    product.id
  );
});

console.log("Database updated with dummy data.");
