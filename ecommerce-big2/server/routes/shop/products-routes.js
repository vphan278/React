import { Router } from 'express';
import { readDB } from '../../src/utils/db.js';
const router = Router();

router.get('/', (req,res)=>{
  const { brand, category, q, sort } = req.query;
  const db = readDB();
  let list = db.products || [];
  if (brand){ const bs = Array.isArray(brand)?brand:String(brand).split(','); list = list.filter(p => bs.includes(p.brand)); }
  if (category){ const cs = Array.isArray(category)?category:String(category).split(','); list = list.filter(p => cs.includes(p.category)); }
  if (q){ const s = String(q).toLowerCase(); list = list.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)); }
  if (sort === 'price_low_high') list = list.slice().sort((a,b)=> (a.salePrice||a.price) - (b.salePrice||b.price));
  if (sort === 'price_high_low') list = list.slice().sort((a,b)=> (b.salePrice||b.price) - (a.salePrice||a.price));
  res.json({ success:true, data: list });
});

router.get('/:id', (req,res)=>{
  const db = readDB();
  const p = (db.products||[]).find(x => x._id === req.params.id);
  if (!p) return res.status(404).json({ success:false });
  res.json({ success:true, data: p });
});

export default router;
