import { Router } from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
export const adminRouter = Router();

adminRouter.post('/:category/import', upload.single('file'), async (_req, res) => {
  // TODO: parse XLSX/CSV → upsert DB → report JSON + CSV
  res.json({ ok: true });
});
