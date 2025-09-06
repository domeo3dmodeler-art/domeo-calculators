import { Router } from 'express';
import { getOptions } from '../services/catalog.js';
export const catalogRouter = Router();

catalogRouter.get('/:category/options', async (req, res) => {
  const cat = req.params.category;
  const selection = { ...req.query } as Record<string, any>;
  const result = await getOptions(cat, selection);
  res.json(result);
});
