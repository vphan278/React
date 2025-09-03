
import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Profile() {
  const [me, setMe] = useState(null);
  useEffect(() => { api.get("/auth/me").then(r => setMe(r.data)).catch(()=>setMe(null)); }, []);
  if (!me) return <p>Login to view your profile.</p>;
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </div>
  );
}
