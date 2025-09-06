import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App(){
  const [cats, setCats] = useState<any[]>([]);
  const [active, setActive] = useState<string>('doors');
  useEffect(()=>{ axios.get('/categories').then(r=> setCats(r.data.categories)); },[]);
  return (
    <div style={{padding:16}}>
      <h1>No‑Code Calculators</h1>
      <div style={{display:'flex', gap:8}}>
        {cats.map(c => (
          <button key={c.key} onClick={()=>setActive(c.key)} disabled={!c.enabled}>{c.title}</button>
        ))}
      </div>
      <hr/>
      <Category key={active} cat={active}/>
    </div>
  );
}

function Category({cat}:{cat:string}){
  const [cfg, setCfg] = useState<any>(null);
  const [options, setOptions] = useState<any>({attributes:{}});
  const [sel, setSel] = useState<any>({});
  useEffect(()=>{ fetch(`/static/${cat}/category.json`).then(r=>r.json()).then(setCfg); },[cat]);
  useEffect(()=>{ axios.get(`/catalog/${cat}/options`, { params: sel }).then(r=> setOptions(r.data)); },[cat, sel]);
  if (!cfg) return null;
  return (
    <div>
      {(cfg.ui.flow||[]).map((step:any)=>(
        <Step key={step.step} step={step} options={options.attributes} sel={sel} onChange={setSel}/>
      ))}
    </div>
  );
}

function Step({step, options, sel, onChange}:{step:any, options:any, sel:any, onChange:(s:any)=>void}){
  if (step.widget?.startsWith('select')){
    const fields = step.step === 'options' ? step.sections.flatMap((s:any)=>s.fields) : [step.step];
    return (
      <div style={{margin:'12px 0'}}>
        {step.label && <h3>{step.label}</h3>}
        {fields.map((f:string)=> (
          <div key={f} style={{marginBottom:8}}>
            <label style={{display:'block'}}>{f}</label>
            <select value={sel[f]||''} onChange={e=> onChange({...sel, [f]: e.target.value})}>
              <option value="">—</option>
              {(options[f]||[]).map((v:any)=>(<option key={String(v)} value={String(v)}>{String(v)}</option>))}
            </select>
          </div>
        ))}
      </div>
    );
  }
  if (step.widget === 'price.card'){
    return <PriceCard sel={sel}/>;
  }
  return null;
}

function PriceCard({sel}:{sel:any}){
  const [resp, setResp] = useState<any>(null);
  useEffect(()=>{ if(Object.keys(sel).length){
      fetch('/price/doors', {method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify({selection: sel})})
        .then(r=>r.json()).then(setResp);
  } },[JSON.stringify(sel)]);
  return (
    <div style={{border:'1px solid #ccc', padding:12, borderRadius:8}}>
      <h3>Цена</h3>
      <pre>{resp ? JSON.stringify(resp, null, 2) : '—'}</pre>
    </div>
  );
}
