import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { clearCart } from "../features/cart/cartSlice";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    // After successful checkout, clear cart
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <Header />
      <section style={{ padding: 18 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ marginTop: 0 }}>Payment Successful</h2>
          <p>Your order was placed successfully.</p>
          {sessionId ? (
            <p style={{ color: "#666" }}>Stripe Session: {sessionId}</p>
          ) : null}
          <Link to="/" style={{ color: "#111" }}>
            Continue shopping
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
