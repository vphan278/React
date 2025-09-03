
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import useCart from "../store/useCart.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const add = useCart(s => s.add);

  useEffect(() => { api.get("/products").then(res => setProducts(res.data)); }, []);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
        {products.map(p => (
          <article key={p._id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <Link to={`/product/${p._id}`}><img src={p.image} alt={p.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} /></Link>
            <h3>{p.title}</h3>
            <p>${p.price.toFixed(2)}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to={`/product/${p._id}`}><button>View</button></Link>
              <button onClick={() => add(p, 1)}>Add to cart</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
