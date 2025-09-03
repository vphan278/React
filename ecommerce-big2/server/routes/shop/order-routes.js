import { Router } from 'express';
import { readDB, writeDB } from '../../src/utils/db.js';
const router = Router();

router.post('/create', (req,res)=>{
  const { userId, cartId, cartItems, address, amount } = req.body || {};
  const db = readDB(); const id = 'o'+(db.orders.length+1);
  const order = { _id:id, userId, cartId, items: cartItems||[], address:address||null, amount:amount||0, status:'created', createdAt:new Date().toISOString() };
  db.orders.push(order); writeDB(db); res.json({ success:true, data: order });
});

router.get('/user/:userId', (req,res)=>{
  const db = readDB(); const list = db.orders.filter(o => o.userId === req.params.userId);
  res.json({ success:true, data: list });
});

export default router;
