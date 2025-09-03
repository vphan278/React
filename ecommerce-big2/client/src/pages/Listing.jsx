import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../store/shop/products-slice/index.js";
import { addItemLocal, addToCart, fetchCartItems } from "../store/shop/cart-slice/index.js";

export default function Listing(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const brand = params.get("brand");
  const { productList = [] } = useSelector((s)=> s.shopProducts);
  const { isAuthenticated, user } = useSelector((s)=> s.auth);

  useEffect(()=>{ dispatch(fetchAllProducts()); }, [dispatch]);

  const list = productList.filter(p => !brand || p.brand === brand);

  function add(p){
    if (!isAuthenticated){
      dispatch(addItemLocal({ product: p, quantity: 1 }));
      navigate("/shop/checkout");
      return;
    }
    dispatch(addToCart({ userId: user?.id, productId: p._id, quantity: 1 }))
      .then(()=> dispatch(fetchCartItems(user?.id)))
      .then(()=> navigate("/shop/checkout"));
  }

  return (
    <div style={{padding:16}}>
      <h2>{brand ? `Brand: ${brand}` : "All Products"}</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:12}}>
        {list.map(p => (
          <div key={p._id} style={{border:"1px solid #eee", borderRadius:8, padding:12}}>
            <div style={{paddingTop:"100%", position:"relative", background:"#fafafa", overflow:"hidden"}}>
              <img src={p.images?.[0]} alt={p.title} style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover"}}/>
            </div>
            <div style={{marginTop:8, fontWeight:600}}>{p.title}</div>
            <div>${(p.salePrice>0?p.salePrice:p.price).toFixed(2)}</div>
            <button onClick={()=>add(p)} style={{marginTop:8}}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
