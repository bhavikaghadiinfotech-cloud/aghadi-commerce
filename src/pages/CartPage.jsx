import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { api } from "../utils/api";
import {
  removeFromCart,
  setQty,
  clearCart,
  selectCartTotal,
} from "../features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);

  async function handleStripeCheckout() {
    try {
      const res = await api.post("/checkout/create-session", {
        cartItems: items,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
        return;
      }

      alert("Checkout URL not returned.");
    } catch (e) {
      alert(e?.response?.data?.message || "Checkout failed");
    }
  }

  return (
    <>
      <Header />

      <section style={{ padding: 18 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ marginTop: 0 }}>Your Cart</h2>

          {!items.length && <p>Cart is empty.</p>}

          {items.map((x) => (
            <div
              key={x.id}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 120px 100px",
                gap: 12,
                padding: 12,
                border: "1px solid #eee",
                borderRadius: 12,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <img
                src={x.image}
                alt={x.title}
                style={{ width: 70, height: 70, objectFit: "contain" }}
              />

              <div>
                <div style={{ fontWeight: 600 }}>{x.title}</div>
                <div style={{ color: "#666", fontSize: 13 }}>
                  ${x.price} each
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(x.id))}
                  style={{
                    marginTop: 6,
                    border: "none",
                    background: "transparent",
                    color: "crimson",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Remove
                </button>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#666" }}>Qty</div>
                <input
                  value={x.qty}
                  onChange={(e) =>
                    dispatch(setQty({ id: x.id, qty: e.target.value }))
                  }
                  type="number"
                  min="1"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 10,
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              <div style={{ fontWeight: 700, textAlign: "right" }}>
                ${(x.price * x.qty).toFixed(2)}
              </div>
            </div>
          ))}

          {items.length ? (
            <div
              style={{
                marginTop: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Clear Cart
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  type="button"
                  onClick={handleStripeCheckout}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #111",
                    background: "#111",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Checkout (Stripe)
                </button>

                <div style={{ fontSize: 18 }}>
                  Total: <b>${total.toFixed(2)}</b>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </>
  );
}
