PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT,
  enabled INTEGER DEFAULT 1,
  config_json TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  model TEXT NOT NULL,
  style TEXT,
  finish TEXT,
  color TEXT,
  type TEXT,
  width INTEGER,
  height INTEGER,
  rrc_price REAL,
  photo_url TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(category, model, finish, color, type, width, height)
);

CREATE TABLE IF NOT EXISTS sizes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  model TEXT NOT NULL,
  type TEXT NOT NULL,
  width INTEGER,
  height INTEGER
);

CREATE TABLE IF NOT EXISTS fixtures (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  kind TEXT NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  meta_json TEXT
);

CREATE TABLE IF NOT EXISTS pricing_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  json TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_model ON products(model);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
