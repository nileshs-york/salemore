import Database from "better-sqlite3";
const db = new Database("salemore.db");
const products = db.prepare("SELECT * FROM products LIMIT 5").all();
console.log(JSON.stringify(products, null, 2));
