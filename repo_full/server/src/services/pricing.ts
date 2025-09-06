import { getConfigRegistry } from './configRegistry.js';

export async function price(category: string, selection: Record<string, any>) {
  const cfg = getConfigRegistry().get(category);
  if (!cfg) throw new Error('Unknown category');

  // TODO: base из БД по selection и cfg.pricing.basePrice.by
  let base = 10000; // stub
  const breakdown: any[] = [];

  for (const r of (cfg.pricing.rules || [])) {
    if (!passWhen(r.when, selection)) continue;
    let delta = 0;
    const op = r.op;
    const val = r.fromAttr ? resolveAttr(selection, r.fromAttr) : r.value;
    switch (op) {
      case 'add': delta = +(val||0); base += delta; break;
      case 'mul': delta = base * (Number(val)-1); base *= Number(val); break;
      case 'round': base = roundTo(base, r.to ?? 1); break;
      default: break;
    }
    breakdown.push({ code: r.code || op, type: op, value: val ?? r.to, delta: Math.round(delta) });
  }
  base = Math.round(base);
  return { currency: cfg.pricing.currency || 'RUB', base, breakdown, total: base };
}

function passWhen(when: any, sel: Record<string, any>) {
  if (!when) return true;
  return Object.entries(when).every(([k, v]) => {
    const cur = sel[k];
    if (typeof v === 'string' && v.startsWith('>=')) return Number(cur) >= Number(v.slice(2));
    return cur === v;
  });
}
function resolveAttr(sel: any, path: string) { return path.split('.').reduce((a, p) => (a ? a[p] : undefined), sel); }
function roundTo(n: number, to: number) { return Math.round(n / to) * to; }
