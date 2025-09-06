import { getConfigRegistry } from './configRegistry.js';

// TODO: подключить реальную БД. Пока — моки/enum из конфигурации
export async function getOptions(category: string, selection: Record<string, any>) {
  const cfg = getConfigRegistry().get(category);
  if (!cfg) throw new Error('Unknown category');
  const attrs: Record<string, any[]> = {};
  for (const a of cfg.attributes) {
    if (a.enum) attrs[a.name] = a.enum;
    else attrs[a.name] = []; // SELECT DISTINCT ... FROM products WHERE ...
  }
  return { attributes: attrs };
}
