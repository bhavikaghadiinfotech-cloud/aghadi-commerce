import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ padding: 16, fontFamily: "Arial" }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>FakeStore Demo</h2>
        <Link to="/">Products</Link>
      </header>
      <hr />
      <Outlet />
    </div>
  );
}
