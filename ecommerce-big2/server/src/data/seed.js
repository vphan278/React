import { readDB, writeDB } from '../utils/db.js';
const brands = ['nike','adidas','puma','levi','zara','hm'];
const categories = ['shoes','shirts','pants','jackets'];
const prods = Array.from({length:18}).map((_,i)=>{
  const b = brands[i%brands.length]; const c = categories[i%categories.length];
  const price = 20 + (i%6)*10; const salePrice = i%3===0 ? price-5 : 0;
  return { _id:'p'+(i+1), title:`${b.toUpperCase()} ${c} ${i+1}`, description:`${b} ${c}`, images:[`https://picsum.photos/seed/${i+1}/600/600`], brand:b, category:c, price, salePrice, stock:50 };
});
const db = readDB(); db.products = prods; db.users = []; db.carts = {}; db.reviews = {}; db.orders = []; writeDB(db);
console.log('Seeded', prods.length, 'products');
