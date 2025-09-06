import { Router } from 'express';
import { getConfigRegistry } from '../services/configRegistry.js';
export const categoriesRouter = Router();

categoriesRouter.get('/', (_req, res) => {
  const cfgs = getConfigRegistry().list();
  res.json({ categories: cfgs.map((c:any) => ({ key: c.key, title: c.title, icon: c.tabsIcon, enabled: c.enabled !== false })) });
});
