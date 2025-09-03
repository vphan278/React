import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/shop/products-slice/index.js";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList = [] } = useSelector((s)=> s.shopProducts);
  useEffect(()=>{ dispatch(fetchAllProducts()); }, [dispatch]);

  const brands = Array.from(new Set(productList.map(p => p.brand))).filter(Boolean);

  return (
    <div style={{padding:16}}>
      <h2>Brands</h2>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        {brands.map(b => (
          <button key={b} onClick={()=>navigate(`/shop/listing?brand=${encodeURIComponent(b)}`)}>{b}</button>
        ))}
      </div>
      <h2 style={{marginTop:24}}>Featured</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:12}}>
        {productList.slice(0,8).map(p => (
          <div key={p._id} style={{border:"1px solid #eee", borderRadius:8, padding:12}}>
            <div style={{paddingTop:"100%", position:"relative", background:"#fafafa", overflow:"hidden"}}>
              <img src={p.images?.[0]} alt={p.title} style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover"}}/>
            </div>
            <div style={{marginTop:8, fontWeight:600}}>{p.title}</div>
            <div>${(p.salePrice>0?p.salePrice:p.price).toFixed(2)}</div>
            <button onClick={()=>navigate(`/shop/listing?brand=${encodeURIComponent(p.brand)}`)} style={{marginTop:8}}>View brand</button>
          </div>
        ))}
      </div>
    </div>
  );
}
