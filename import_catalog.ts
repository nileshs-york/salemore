import Database from "better-sqlite3";
import { catalog } from "./src/data/catalog.js";

const db = new Database("salemore.db");

for (const cat of catalog) {
  // Insert category
  let category = db.prepare("SELECT id FROM categories WHERE name = ?").get(cat.category) as { id: number } | undefined;
  if (!category) {
    console.log(`Inserting category: ${cat.category}`);
    const info = db.prepare("INSERT INTO categories (name, description, image) VALUES (?, ?, ?)").run(cat.category, "Description for " + cat.category, "https://picsum.photos/seed/" + cat.category.replace(/ /g, '') + "/400/300");
    category = { id: info.lastInsertRowid as number };
  }

  // Insert products
  for (const prod of cat.products) {
    const productExists = db.prepare("SELECT id FROM products WHERE name = ? AND category_id = ?").get(prod, category.id);
    if (!productExists) {
      console.log(`Inserting product: ${prod} into ${cat.category}`);
      db.prepare("INSERT INTO products (category_id, name, description, price, image, is_featured) VALUES (?, ?, ?, ?, ?, ?)")
        .run(category.id, prod, "Description for " + prod, 10.0, "https://picsum.photos/seed/" + prod.replace(/ /g, '') + "/400/400", 0);
    }
  }
}
console.log("Catalog import complete.");
