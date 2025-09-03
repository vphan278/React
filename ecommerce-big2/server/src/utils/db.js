import fs from 'fs';
import path from 'path';
const DB_PATH = path.resolve(process.cwd(), 'src', 'data', 'db.json');
export function readDB(){ try{ const raw = fs.readFileSync(DB_PATH,'utf-8'); return JSON.parse(raw);}catch(e){ return { users: [], products: [], carts: {}, reviews: {}, orders: [] }; } }
export function writeDB(db){ fs.mkdirSync(path.dirname(DB_PATH), { recursive:true }); fs.writeFileSync(DB_PATH, JSON.stringify(db,null,2)); }
