import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { categoriesRouter } from './routes/categories.js';
import { catalogRouter } from './routes/catalog.js';
import { priceRouter } from './routes/price.js';
import { adminRouter } from './routes/admin.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = process.env.STATIC_DIR || path.resolve(__dirname, '../../static');
app.use('/static', express.static(STATIC_DIR));

app.use('/categories', categoriesRouter);
app.use('/catalog', catalogRouter);
app.use('/price', priceRouter);
app.use('/admin', adminRouter);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`API on :${port}`));
