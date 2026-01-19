import { useAuth } from "./hooks";
import Login from "./pages/logIn";
import SignUp from "./pages/signUp";
import PersonalInfo from "./pages/personalInfo";
import AuthLayout from "./components/authLayout";
import { useEffect } from "react";
export default function Auth() {
  const { isAuthencated, user, authMode, navigate } = useAuth();

  useEffect(() => {
    if (isAuthencated && user?.name && user?.image) {
      navigate("/home");
    }
  }, [isAuthencated, user, navigate]);

  const renderAuthContent = () => {
    if (user?.username) return <PersonalInfo />;
    if (authMode === "login") return <Login />;
    return <SignUp />;
  };
  return <AuthLayout>{renderAuthContent()}</AuthLayout>;
}
