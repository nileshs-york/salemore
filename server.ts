import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("salemore.db");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    price REAL,
    image TEXT,
    is_featured INTEGER DEFAULT 0,
    packaging_size TEXT,
    shape TEXT,
    packaging TEXT,
    color TEXT,
    per_piece_price TEXT,
    mrp TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    rating INTEGER,
    comment TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add new columns to products if they don't exist
const tableInfo = db.prepare("PRAGMA table_info(products)").all() as any[];
const columnNames = tableInfo.map(col => col.name);

const newColumns = [
  'packaging_size',
  'shape',
  'packaging',
  'color',
  'per_piece_price',
  'mrp'
];

newColumns.forEach(col => {
  if (!columnNames.includes(col)) {
    db.exec(`ALTER TABLE products ADD COLUMN ${col} TEXT`);
  }
});

// Seed initial data if empty
// const categoryCount = db.prepare("SELECT count(*) as count FROM categories").get() as { count: number };
// if (categoryCount.count === 0) {
//   const insertCategory = db.prepare("INSERT INTO categories (name, description, image) VALUES (?, ?, ?)");
//   insertCategory.run("Gummy Bears", "Soft and chewy gummy bears in various flavors.", "https://picsum.photos/seed/gummy/400/300");
//   insertCategory.run("Lollipops", "Sweet and long-lasting lollipops for everyone.", "https://picsum.photos/seed/lollipop/400/300");
//   insertCategory.run("Sour Candies", "Tangy and sour treats that pack a punch.", "https://picsum.photos/seed/sour/400/300");

//   const insertProduct = db.prepare("INSERT INTO products (category_id, name, description, price, image, is_featured) VALUES (?, ?, ?, ?, ?, ?)");
//   insertProduct.run(1, "Classic Gold Bears", "The original gummy bear.", 5.99, "https://picsum.photos/seed/bear1/400/400", 1);
//   insertProduct.run(1, "Neon Worms", "Brightly colored sour worms.", 4.99, "https://picsum.photos/seed/worm1/400/400", 1);
//   insertProduct.run(2, "Swirly Pop", "Giant rainbow swirl lollipop.", 2.50, "https://picsum.photos/seed/pop1/400/400", 1);

//   const insertReview = db.prepare("INSERT INTO reviews (user_name, rating, comment, avatar) VALUES (?, ?, ?, ?)");
//   insertReview.run("Alice Smith", 5, "The best candies I've ever had! So fresh and flavorful.", "https://i.pravatar.cc/150?u=alice");
//   insertReview.run("Bob Johnson", 4, "Great variety and fast shipping. My kids love the gummies.", "https://i.pravatar.cc/150?u=bob");
// }

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(uploadDir));

  // API Routes
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  });

  app.get("/api/products", (req, res) => {
    const { categoryId, featured } = req.query;
    let query = "SELECT * FROM products";
    const params = [];

    if (categoryId) {
      query += " WHERE category_id = ?";
      params.push(categoryId);
    } else if (featured) {
      query += " WHERE is_featured = 1";
    }

    const products = db.prepare(query).all(...params);
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  // Simple Auth Middleware
  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization;
    if (token === "fake-jwt-token-salemore") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  app.get("/api/reviews", (req, res) => {
    const reviews = db.prepare("SELECT * FROM reviews").all();
    res.json(reviews);
  });

  app.post("/api/contacts", (req, res) => {
    const { name, email, company, subject, message } = req.body;
    const info = db.prepare(`
      INSERT INTO contacts (name, email, company, subject, message) 
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, company, subject, message);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.get("/api/admin/contacts", authMiddleware, (req, res) => {
    const contacts = db.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all();
    res.json(contacts);
  });

  // Admin Authentication (Simplified for demo)
  const ADMIN_USER = "admin_manish";
  const ADMIN_PASS = "Manish@SaleMore#1999";

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      res.json({ success: true, token: "fake-jwt-token-salemore" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Admin API
  app.post("/api/admin/products", authMiddleware, upload.single("image"), (req, res) => {
    const {
      category_id, name, description, price, is_featured,
      packaging_size, shape, packaging, color, per_piece_price, mrp
    } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const info = db.prepare(`
      INSERT INTO products (
        category_id, name, description, price, image, is_featured,
        packaging_size, shape, packaging, color, per_piece_price, mrp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      category_id, name, description, price, imagePath, is_featured === 'true' || is_featured === '1' ? 1 : 0,
      packaging_size, shape, packaging, color, per_piece_price, mrp
    );
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/admin/products/:id", authMiddleware, (req, res) => {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/products/bulk-delete", authMiddleware, (req, res) => {
    const { ids } = req.body;
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const transaction = db.transaction((ids: number[]) => {
      for (const id of ids) stmt.run(id);
    });
    transaction(ids);
    res.json({ success: true });
  });

  app.put("/api/admin/products/:id", authMiddleware, upload.single("image"), (req, res) => {
    const {
      category_id, name, description, price, is_featured,
      packaging_size, shape, packaging, color, per_piece_price, mrp
    } = req.body;

    let query = `
      UPDATE products SET 
        category_id = ?, name = ?, description = ?, price = ?, 
        is_featured = ?, packaging_size = ?, shape = ?, packaging = ?, 
        color = ?, per_piece_price = ?, mrp = ?
    `;
    const params = [
      category_id, name, description, price,
      is_featured === 'true' || is_featured === '1' ? 1 : 0,
      packaging_size, shape, packaging, color, per_piece_price, mrp
    ];

    if (req.file) {
      query += ", image = ?";
      params.push(`/uploads/${req.file.filename}`);
    }

    query += " WHERE id = ?";
    params.push(req.params.id);

    db.prepare(query).run(...params);
    res.json({ success: true });
  });

  app.post("/api/admin/categories", authMiddleware, upload.single("image"), (req, res) => {
    const { name, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const info = db.prepare("INSERT INTO categories (name, description, image) VALUES (?, ?, ?)")
      .run(name, description, imagePath);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/admin/categories/:id", authMiddleware, (req, res) => {
    // Check if category has products
    const products = db.prepare("SELECT count(*) as count FROM products WHERE category_id = ?").get(req.params.id) as { count: number };
    if (products.count > 0) {
      return res.status(400).json({ error: "Cannot delete category with products" });
    }
    db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/categories/bulk-delete", authMiddleware, (req, res) => {
    const { ids } = req.body;
    const stmt = db.prepare("DELETE FROM categories WHERE id = ?");
    const checkStmt = db.prepare("SELECT count(*) as count FROM products WHERE category_id = ?");

    const transaction = db.transaction((ids: number[]) => {
      for (const id of ids) {
        const products = checkStmt.get(id) as { count: number };
        if (products.count === 0) {
          stmt.run(id);
        }
      }
    });
    transaction(ids);
    res.json({ success: true });
  });

  app.put("/api/admin/categories/:id", authMiddleware, upload.single("image"), (req, res) => {
    const { name, description } = req.body;

    let query = "UPDATE categories SET name = ?, description = ?";
    const params = [name, description];

    if (req.file) {
      query += ", image = ?";
      params.push(`/uploads/${req.file.filename}`);
    }

    query += " WHERE id = ?";
    params.push(req.params.id);

    db.prepare(query).run(...params);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
