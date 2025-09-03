
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";
import useCart from "../store/useCart.js";

export default function Product() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const add = useCart(s => s.add);

  useEffect(() => { api.get(`/products/${id}`).then(res => setP(res.data)); }, [id]);

  if (!p) return <p>Loading...</p>;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 8 }} />
      <div>
        <h2>{p.title}</h2>
        <p>{p.description}</p>
        <h3>${p.price.toFixed(2)}</h3>
        <button onClick={() => add(p, 1)}>Add to cart</button>
      </div>
    </div>
  );
}
