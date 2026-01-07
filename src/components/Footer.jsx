export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e5e5",
        padding: "16px",
        marginTop: 10,
        color: "#666",
        fontSize: 13,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        © {new Date().getFullYear()} FakeStore Demo — Built with React + Redux Thunk
      </div>
    </footer>
  );
}
