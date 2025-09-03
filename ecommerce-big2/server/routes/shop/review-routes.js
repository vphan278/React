import { Router } from 'express';
import { readDB, writeDB } from '../../src/utils/db.js';
const router = Router();

router.get('/get/:productId', (req,res)=>{
  const db = readDB(); const list = db.reviews[req.params.productId] || [];
  res.json({ success:true, data: list });
});

router.post('/add', (req,res)=>{
  const { productId, rating, reviewMsg, userId, userName } = req.body || {};
  if (!productId || !rating || !reviewMsg) return res.status(400).json({ success:false, message:'Missing fields' });
  const db = readDB(); const list = db.reviews[productId] || [];
  const entry = { _id:'r'+(list.length+1), productId, rating:Number(rating), reviewMsg:String(reviewMsg), userId:userId||'guest', userName:userName||'Guest', createdAt:new Date().toISOString() };
  list.push(entry); db.reviews[productId] = list; writeDB(db);
  res.json({ success:true, data: entry });
});

export default router;
