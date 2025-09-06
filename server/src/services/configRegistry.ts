import fs from 'fs';
import path from 'path';

let _cache: any[] | null = null;
export function getConfigRegistry() {
  if (!_cache) {
    const dir = process.env.CONFIG_DIR || path.resolve('../config');
    const cats = fs.readdirSync(dir).filter(d => !d.startsWith('_'));
    _cache = cats.map(key => {
      const cfgPath = path.join(dir, key, 'category.json');
      const json = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
      return json;
    });
  }
  return {
    list: () => _cache!,
    get: (key: string) => _cache!.find((c:any) => c.key === key)
  };
}
