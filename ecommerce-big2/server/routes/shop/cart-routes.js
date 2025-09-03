import { Router } from 'express';
import { readDB, writeDB } from '../../src/utils/db.js';
const router = Router();
function ensureCart(db, uid){ if (!db.carts[uid]) db.carts[uid] = { _id: uid, items: [] }; return db.carts[uid]; }

router.post('/add', (req,res)=>{
  const { userId, productId, quantity=1 } = req.body || {};
  if (!userId || !productId) return res.status(400).json({ success:false, message:'Missing userId/productId' });
  const db = readDB(); const cart = ensureCart(db, userId);
  const idx = cart.items.findIndex(i=> i.productId === productId);
  if (idx>=0) cart.items[idx].quantity += quantity;
  else {
    const product = (db.products||[]).find(p=> p._id === productId);
    cart.items.push({ productId, title: product?.title || 'Product', image: product?.images?.[0] || '', price: product?.price || 0, salePrice: product?.salePrice || 0, quantity });
  }
  writeDB(db); res.json({ success:true, data: cart });
});

router.get('/get/:userId', (req,res)=>{
  const db = readDB(); const cart = db.carts[req.params.userId] || { _id:req.params.userId, items: [] };
  res.json({ success:true, data: cart });
});

router.put('/update-cart', (req,res)=>{
  const { userId, productId, quantity } = req.body || {};
  const db = readDB(); const cart = ensureCart(db, userId);
  cart.items = cart.items.map(i => i.productId === productId ? { ...i, quantity } : i).filter(i => i.quantity > 0);
  writeDB(db); res.json({ success:true, data: cart });
});

router.delete('/:userId/:productId', (req,res)=>{
  const db = readDB(); const cart = ensureCart(db, req.params.userId);
  cart.items = cart.items.filter(i => i.productId !== req.params.productId);
  writeDB(db); res.json({ success:true, data: cart });
});

export default router;
