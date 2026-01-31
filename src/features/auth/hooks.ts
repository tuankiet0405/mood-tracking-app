import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../globalHooks";
import {
  loginService,
  signupService,
  logout,
  switchMode,
  type AuthMode,
  type User,
  setError,
  setUser,
  clearError,
} from "./authSlice";
import { setDefaultTodayRecord } from "../home/moodSlices";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error, loading, authMode, isAuthencated } = useAppSelector(
    (state) => state.auth,
  );

  const handleSetUser = (userData: User) => dispatch(setUser(userData));

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      dispatch(setError("Vui lòng nhập thông tin tài khoản!"));
      return;
    }
    await dispatch(loginService({ email, password }));
  };

  const handleSignup = async (email: string, password: string) => {
    if (!email || !password) {
      dispatch(setError("Vui lòng nhập đầy đủ thông tin tài khoản!"));
      return;
    }
    await dispatch(signupService({ email, password }));
  };

  const handleLogout = () => dispatch(logout());
  const handleSwithMode = (mode: AuthMode) => dispatch(switchMode(mode));
  const handleSetError = (errorMsg: string) => dispatch(setError(errorMsg));
  const handleClearError = () => dispatch(clearError());
  const handleSetDefaultTodayMood = () => dispatch(setDefaultTodayRecord());

  return {
    authMode,
    isAuthencated,
    navigate,
    user,
    loading,
    error,
    handleSetError,
    handleClearError,
    handleLogin,
    handleSignup,
    handleLogout,
    handleSwithMode,
    handleSetUser,
    handleSetDefaultTodayMood,
  };
}
