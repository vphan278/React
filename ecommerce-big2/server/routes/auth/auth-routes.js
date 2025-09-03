import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readDB, writeDB } from '../../src/utils/db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function sign(user){ return jwt.sign({ id:user.id, email:user.email, name:user.name }, JWT_SECRET, { expiresIn:'7d' }); }

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body || {};
  if(!name||!email||!password) return res.status(400).json({ success:false, message:'Missing fields' });
  const db = readDB();
  if (db.users.find(u => u.email.toLowerCase() === email.toLowerCase())) return res.status(409).json({ success:false, message:'Email already registered' });
  const id = 'u'+(db.users.length+1);
  const hash = await bcrypt.hash(password, 10);
  const user = { id, name, email, password: hash };
  db.users.push(user); writeDB(db);
  const token = sign(user);
  res.cookie('token', token, { httpOnly:true, sameSite:'lax' });
  res.json({ success:true, data: { id, name, email } });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body || {};
  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === (email||'').toLowerCase());
  if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });
  const token = sign(user);
  res.cookie('token', token, { httpOnly:true, sameSite:'lax' });
  res.json({ success:true, data: { id:user.id, name:user.name, email:user.email } });
});

router.get('/check-auth', (req,res)=>{
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success:false });
  try { const p = jwt.verify(token, JWT_SECRET); return res.json({ success:true, data: { id:p.id, name:p.name, email:p.email } }); }
  catch { return res.status(401).json({ success:false }); }
});

router.post('/logout', (req,res)=>{ res.clearCookie('token'); res.json({ success:true }); });

export default router;
