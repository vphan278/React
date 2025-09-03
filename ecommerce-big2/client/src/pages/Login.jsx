import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth-slice/index.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/shop/home");
    }catch(e){ alert("Login failed"); }
  }

  return (
    <div style={{padding:16}}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{display:"grid",gap:8,maxWidth:320}}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>New? <Link to="/auth/register">Register</Link></p>
    </div>
  );
}
