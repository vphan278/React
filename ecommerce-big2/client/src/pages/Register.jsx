import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth-slice/index.js";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate("/auth/login");
    }catch(e){ alert("Register failed"); }
  }

  return (
    <div style={{padding:16}}>
      <h2>Register</h2>
      <form onSubmit={submit} style={{display:"grid",gap:8,maxWidth:320}}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/auth/login">Login</Link></p>
    </div>
  );
}
