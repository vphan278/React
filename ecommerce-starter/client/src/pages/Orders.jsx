
import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders/mine").then(r => setOrders(r.data)); }, []);
  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : orders.map(o => (
        <div key={o._id} style={{ border: "1px solid #eee", padding: 12, marginBottom: 12 }}>
          <div><b>Order:</b> {o._id}</div>
          <div><b>Total:</b> ${o.total.toFixed(2)}</div>
          <ul>
            {o.items.map((it, idx) => <li key={idx}>{it.title} × {it.qty} — ${it.price.toFixed(2)}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
