import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.products);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set();
    (items || []).forEach((p) => {
      if (p?.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    const list = items || [];
    if (selectedCategory === "all") return list;
    return list.filter((p) => p.category === selectedCategory);
  }, [items, selectedCategory]);

  const totalItems = filteredItems.length;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / perPage));
  }, [totalItems, perPage]);

  const safePage = useMemo(() => {
    return Math.min(Math.max(1, page), totalPages);
  }, [page, totalPages]);

  const startIndex = useMemo(() => {
    return (safePage - 1) * perPage;
  }, [safePage, perPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + perPage, totalItems);
  }, [startIndex, perPage, totalItems]);

  const pagedItems = useMemo(() => {
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, startIndex, endIndex]);

  const startValue = totalItems === 0 ? 0 : startIndex + 1;
  const endValue = totalItems === 0 ? 0 : endIndex;

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <Banner />

      <section style={{ padding: "14px 16px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label style={{ fontSize: 14, color: "#333" }}>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                marginLeft: 8,
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <div style={{ marginLeft: "auto", fontSize: 13, color: "#666" }}>
            Showing {startValue}–{endValue} of {totalItems} products
          </div>
        </div>
      </section>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {pagedItems.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              style={{ width: "100%", height: 160, objectFit: "contain" }}
            />
            <h4 style={{ fontSize: 14 }}>{p.title}</h4>
            <p style={{ margin: "6px 0" }}>
              <b>${p.price}</b>
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Link to={`/product/${p.id}`}>View</Link>
              <button
                type="button"
                onClick={() => dispatch(addToCart(p))}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <section style={{ padding: "18px 16px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Prev
          </button>

          <div style={{ fontSize: 14 }}>
            Page <b>{safePage}</b> of <b>{totalPages}</b>
          </div>

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}