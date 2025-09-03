
import React, { useState } from "react";
import { api } from "../api.js";
import useAuth from "../store/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("demo@shop.dev");
  const [password, setPassword] = useState("demopass");
  const { setUser } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/login", { email, password });
    const me = await api.get("/auth/me");
    setUser(me.data);
    nav("/");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, marginTop: 24 }}>
      <h1>Login</h1>
      <div><input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" /></div>
      <div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" /></div>
      <button type="submit">Login</button>
    </form>
  );
}
