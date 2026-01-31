import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ACCOUNTS } from "../../constants/accounts";

export type AuthMode = "login" | "signup";

type User = {
  id: number;
  username: string;
  name: string;
  image: string | null;
  age: number;
  gender: number;
};
type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  authMode: AuthMode;
  isAuthencated: boolean;
};

const initialState: AuthState = {
  authMode: "login",
  isAuthencated: false,
  user: null,
  loading: false,
  error: null,
};

export const loginService = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const account = ACCOUNTS.find((item) => item.username === payload.email);
      if (!account) {
        throw new Error("Không có tài khoản với email này.");
      }
      if (account.password !== payload.password) {
        throw new Error("Sai thông tin mật khẩu vui lòng thử lại!");
      }
      return account;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Unexpected error");
    }
  }
);
export const signupService = createAsyncThunk(
  "auth/signup",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const existingAccount = ACCOUNTS.find(
        (item) => item.username === payload.email,
      );
      if (existingAccount) {
        throw new Error("Email này đã được sử dụng.");
      }

      const newAccount = {
        username: payload.email,
        password: payload.password,
        user: {
          id: Date.now(),
          name: "",
          age: 0,
          gender: 0,
          image: null,
        },
      };

      ACCOUNTS.push(newAccount);

      return newAccount;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Unexpected error");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    switchMode(state, action: PayloadAction<AuthMode>) {
      state.authMode = action.payload;
    },
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    updateUserImage(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.image = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginService.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginService.fulfilled, (s, action) => {
        s.loading = false;
        s.user = { username: action.payload.username, ...action.payload.user };
        s.isAuthencated = true;
      })
      .addCase(loginService.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      })
      .addCase(signupService.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(signupService.fulfilled, (s, action) => {
        s.loading = false;
        s.user = { username: action.payload.username, ...action.payload.user };
        s.isAuthencated = true;
      })
      .addCase(signupService.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      });
  },
});

export const {
  logout,
  setUser,
  switchMode,
  setError,
  clearError,
  updateUserImage,
} = authSlice.actions;
export type { User };
export default authSlice.reducer;
