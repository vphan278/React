
import React, { useState } from "react";
import { api } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { name, email, password });
    alert("Registered! Now log in.");
    nav("/login");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, marginTop: 24 }}>
      <h1>Register</h1>
      <div><input value={name} onChange={e => setName(e.target.value)} placeholder="name" /></div>
      <div><input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" /></div>
      <div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" /></div>
      <button type="submit">Create account</button>
    </form>
  );
}
