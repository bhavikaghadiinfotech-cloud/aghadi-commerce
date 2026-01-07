import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearSelected } from "../features/products/productsSlice";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, loading, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!selected) return null;

  return (
    <>
      <Header />
      <Banner />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 18 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
          <img
            src={selected.thumbnail}
            alt={selected.title}
            style={{ width: "100%", height: 240, objectFit: "contain" }}
          />
        </div>

        <div>
          <Link to="/" className="back-btn">← Back</Link>
          <h2 style={{ marginTop: 10 }}>{selected.title}</h2>
          <p><b>Price:</b> ${selected.price}</p>
          <p><b>Category:</b> {selected.category}</p>
          <p style={{ lineHeight: 1.5 }}>{selected.description}</p>

          <button
            type="button"
            onClick={() => dispatch(addToCart(selected))}
            style={{
              marginTop: 10,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
