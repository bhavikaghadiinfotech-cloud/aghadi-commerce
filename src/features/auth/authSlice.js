import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { loadFromStorage, saveToStorage } from "../../utils/storage";

const initialAuth = loadFromStorage("auth", {
  user: null,
  token: null,
  expiresAt: null,
});

function isExpired(expiresAt) {
  if (!expiresAt) return false;
  return Date.now() > Number(expiresAt);
}

// If stored session expired, start as logged-out
if (initialAuth?.expiresAt && isExpired(initialAuth.expiresAt)) {
  initialAuth.user = null;
  initialAuth.token = null;
  initialAuth.expiresAt = null;
  saveToStorage("auth", { user: null, token: null, expiresAt: null });
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", payload);
      return res.data; // { token, user }
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", payload);
      return res.data; // { token, user }
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || "Login failed");
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.user;
    } catch (e) {
      return rejectWithValue("Session expired");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialAuth.user,
    token: initialAuth.token,
    expiresAt: initialAuth.expiresAt,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
      state.loading = false;
      state.error = null;
      saveToStorage("auth", { user: null, token: null, expiresAt: null });
    },
    checkSession(state) {
      if (state.expiresAt && Date.now() > Number(state.expiresAt)) {
        state.user = null;
        state.token = null;
        state.expiresAt = null;
        saveToStorage("auth", { user: null, token: null, expiresAt: null });
      }
    },
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(registerUser.fulfilled, (s, a) => {
      s.loading = false;
      s.token = a.payload.token;
      s.user = a.payload.user;
      s.expiresAt = Date.now() + 12 * 60 * 60 * 1000;
      saveToStorage("auth", {
        token: s.token,
        user: s.user,
        expiresAt: s.expiresAt,
      });
    });
    b.addCase(registerUser.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Register failed";
    });

    b.addCase(loginUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(loginUser.fulfilled, (s, a) => {
      s.loading = false;
      s.token = a.payload.token;
      s.user = a.payload.user;
      s.expiresAt = Date.now() + 12 * 60 * 60 * 1000;
      saveToStorage("auth", {
        token: s.token,
        user: s.user,
        expiresAt: s.expiresAt,
      });
    });
    b.addCase(loginUser.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Login failed";
    });

    b.addCase(fetchMe.fulfilled, (s, a) => {
      s.user = a.payload;
      s.expiresAt = Date.now() + 12 * 60 * 60 * 1000;
      saveToStorage("auth", {
        token: s.token,
        user: s.user,
        expiresAt: s.expiresAt,
      });
    });
  },
});

export const { logout, checkSession } = authSlice.actions;
export default authSlice.reducer;
