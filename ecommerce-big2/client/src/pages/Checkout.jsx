// client/src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  clearLocal,
  updateItemLocal,
  removeItemLocal,
  fetchCartItems,
  updateCartQuantity,
  deleteCartItem,
} from "../store/shop/cart-slice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { cartItems } = useSelector((s) => s.shopCart);

  const items = cartItems?.items || [];
  const [placing, setPlacing] = useState(false);
  const [orderResult, setOrderResult] = useState(null); // <- show order at bottom
  const [errorMsg, setErrorMsg] = useState("");

  const total = useMemo(
    () =>
      items.reduce(
        (sum, it) =>
          sum + (it.salePrice > 0 ? it.salePrice : it.price) * it.quantity,
        0
      ),
    [items]
  );

  // qty handlers
  function inc(item) {
    if (!item) return;
    if (!isAuthenticated) {
      dispatch(
        updateItemLocal({ productId: item.productId, quantity: item.quantity + 1 })
      );
    } else {
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: item.productId,
          quantity: item.quantity + 1,
        })
      ).then(() => dispatch(fetchCartItems(user?.id)));
    }
  }

  function dec(item) {
    if (!item) return;
    const nextQty = Math.max(0, (item.quantity || 1) - 1);
    if (!isAuthenticated) {
      if (nextQty === 0) {
        dispatch(removeItemLocal({ productId: item.productId }));
      } else {
        dispatch(updateItemLocal({ productId: item.productId, quantity: nextQty }));
      }
    } else {
      if (nextQty === 0) {
        dispatch(deleteCartItem({ userId: user?.id, productId: item.productId }))
          .then(() => dispatch(fetchCartItems(user?.id)));
      } else {
        dispatch(
          updateCartQuantity({
            userId: user?.id,
            productId: item.productId,
            quantity: nextQty,
          })
        ).then(() => dispatch(fetchCartItems(user?.id)));
      }
    }
  }

  function removeItem(item) {
    if (!item) return;
    if (!isAuthenticated) {
      dispatch(removeItemLocal({ productId: item.productId }));
    } else {
      dispatch(deleteCartItem({ userId: user?.id, productId: item.productId }))
        .then(() => dispatch(fetchCartItems(user?.id)));
    }
  }

  async function placeOrder() {
    if (!items.length) return;
    setPlacing(true);
    setOrderResult(null);
    setErrorMsg("");

    try {
      const payload = {
        userId: user?.id || "guest",
        cartId: cartItems?._id || "local",
        cartItems: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          image: i.image,
          price: i.price,
          salePrice: i.salePrice,
          quantity: i.quantity,
        })),
        address: null,
        amount: Number(total.toFixed(2)),
      };

      const res = await axios.post(
        "http://localhost:5000/api/shop/order/create",
        payload
      );

      if (res?.data?.success) {
        const order = res.data.data;
        setOrderResult(order); // <- show it below
        // clear cart view
        if (isAuthenticated) {
          await dispatch(fetchCartItems(user?.id));
        } else {
          dispatch(clearLocal());
        }
      } else {
        setErrorMsg("Couldn’t place order. Please try again.");
      }
    } catch (e) {
      setErrorMsg("Couldn’t place order. Please try again.");
      console.error(e);
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Checkout</h1>

      {items.length === 0 ? (
        <p style={{ color: "#666" }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it) => (
            <div
              key={it.productId}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr auto",
                gap: 12,
                alignItems: "center",
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid #eee",
                }}
              >
                <img
                  src={it.image || ""}
                  alt={it.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div>
                <div style={{ fontWeight: 700 }}>{it.title}</div>
                <div style={{ color: "#444" }}>
                  ${(it.salePrice > 0 ? it.salePrice : it.price).toFixed(2)}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => dec(it)}>-</button>
                <span>{it.quantity}</span>
                <button onClick={() => inc(it)}>+</button>
                <button onClick={() => removeItem(it)} style={{ marginLeft: 8 }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 1, background: "#eee", margin: "16px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
        <button onClick={placeOrder} disabled={!items.length || placing}>
          {placing ? "Placing..." : "Place Order"}
        </button>
      </div>

      {/* Feedback / Order section */}
      {errorMsg ? (
        <div
          style={{
            marginTop: 16,
            color: "#b00020",
            background: "#fdecee",
            border: "1px solid #f6c6cc",
            borderRadius: 8,
            padding: 12,
          }}
        >
          {errorMsg}
        </div>
      ) : null}

      {orderResult ? (
        <div
          style={{
            marginTop: 20,
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 14,
            background: "#f9fafb",
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            ✅ Order placed
          </div>
          <div style={{ fontSize: 14, marginBottom: 10, color: "#444" }}>
            Order ID: <b>{orderResult._id}</b> • Total: <b>${Number(orderResult.amount).toFixed(2)}</b>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {orderResult.items?.map((it) => (
              <div key={it.productId} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={it.image}
                  alt={it.title}
                  width={44}
                  height={44}
                  style={{ borderRadius: 6, objectFit: "cover", border: "1px solid #eee" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{it.title}</div>
                  <div style={{ color: "#555", fontSize: 13 }}>
                    Qty {it.quantity} • $
                    {(it.salePrice > 0 ? it.salePrice : it.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}