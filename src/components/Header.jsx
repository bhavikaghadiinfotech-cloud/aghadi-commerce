import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { selectCartCount } from "../features/cart/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const { token, user } = useSelector((s) => s.auth);

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "#111",
          }}
        />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            <Link to="/" style={{ color: "#111", textDecoration: "none" }}>
              FakeStore
            </Link>
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>
            React + Redux Thunk Demo
          </div>
        </div>
      </div>

      <nav style={{ display: "flex", gap: 12, fontSize: 14, alignItems: "center" }}>
        <Link to="/" style={{ color: "#111", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/cart" style={{ color: "#111", textDecoration: "none" }}>
          Cart ({cartCount})
        </Link>

        {!token ? (
          <>
            <Link to="/login" style={{ color: "#111", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#111", textDecoration: "none" }}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span style={{ fontSize: 13, color: "#555" }}>
              {user?.name || user?.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                padding: "8px 10px",
                border: "1px solid #ddd",
                background: "#fff",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
