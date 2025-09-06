import { Router } from 'express';
import { price } from '../services/pricing.js';
export const priceRouter = Router();

priceRouter.post('/:category', async (req, res) => {
  const cat = req.params.category;
  const selection = req.body?.selection || {};
  const result = await price(cat, selection);
  res.json(result);
});
