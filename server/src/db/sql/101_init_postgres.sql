CREATE TABLE IF NOT EXISTS categories (
  key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  config_json JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  model TEXT NOT NULL,
  style TEXT,
  finish TEXT,
  color TEXT,
  type TEXT,
  width INT,
  height INT,
  rrc_price NUMERIC(12,2),
  photo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category, model, finish, color, type, width, height)
);

CREATE TABLE IF NOT EXISTS sizes (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  model TEXT NOT NULL,
  type TEXT NOT NULL,
  width INT,
  height INT
);

CREATE TABLE IF NOT EXISTS fixtures (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  kind TEXT NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  meta_json JSONB
);

CREATE TABLE IF NOT EXISTS pricing_rules (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_model ON products(model);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
