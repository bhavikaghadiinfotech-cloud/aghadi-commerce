import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { registerUser } from "../features/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  async function submit(e) {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  }

  return (
    <>
      <Header />

      <section style={{ padding: 18 }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <h2>Register</h2>

          <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />

            {error && <div style={{ color: "crimson" }}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          <p style={{ marginTop: 10, color: "#666" }}>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
