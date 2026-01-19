import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../globalHooks";
import {
  loginService,
  signupService,
  logout,
  switchMode,
  type AuthMode,
  setError,
  setUser,
} from "./authSlice";
import { setDefaultTodayRecord } from "../home/moodSlices";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error, loading, authMode, isAuthencated } = useAppSelector(
    (state) => state.auth
  );
  const handleSetUser = (user) => dispatch(setUser(user));
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      dispatch(setError("Vui lòng nhập thông tin tài khoản!"));
      return;
    }
    await dispatch(loginService({ email, password }));
  };
  const handleSignup = async (email: string, password: string) => {
    if (!email || !password) {
      dispatch(setError("Vui lòng nhập đầy dủ thông tin tài khoản!"));
      return;
    }
    await dispatch(signupService({ email, password }));
  };
  const handleLogout = () => dispatch(logout());
  const handleSwithMode = (mode: AuthMode) => dispatch(switchMode(mode));
  const handleSetError = (error: string) => dispatch(setError(error));
  const handleSetDefaultTodayMood = () => dispatch(setDefaultTodayRecord());
  return {
    authMode,
    isAuthencated,
    navigate,
    user,
    loading,
    error,
    handleSetError,
    handleLogin,
    handleSignup,
    handleLogout,
    handleSwithMode,
    handleSetUser,
    handleSetDefaultTodayMood,
  };
}
