export default function Banner() {
  return (
    <section
      style={{
        padding: "28px 16px",
        borderBottom: "1px solid #eee",
        background: "linear-gradient(135deg, #fafafa, #f2f2f2)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}>
          Shop Smart. Buy Better.
        </h1>
        <p style={{ marginTop: 10, marginBottom: 0, color: "#555" }}>
          Products are loaded from your Node.js backend API using Redux Thunk.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="#products"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Browse Products
          </a>

          <a
            href="https://fakestoreapi.com/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #ddd",
              color: "#111",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            FakeStore API
          </a>
        </div>
      </div>
    </section>
  );
}
