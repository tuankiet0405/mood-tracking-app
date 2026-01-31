import { useState } from "react";
import { Input } from "../../../components/input";
import { Stack } from "../../../components/stack";
import { useAuth } from "../hooks";
import { validateEmail } from "../validation";

export default function Login() {
  const { handleSwithMode, handleLogin, loading, error, handleClearError } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError) setEmailError(null);
    if (error) handleClearError();
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error) handleClearError();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setEmailError(emailValidation.message);
      return;
    }

    if (!password.trim()) {
      return;
    }

    handleLogin(email, password);
  };

  return (
    <Stack className="bg-white py-10 px-4 mx-4 rounded-16" gap="400">
      <Stack gap="100">
        <h3 className="text-preset-3 text-neutral-900">Welcome back</h3>
        <p className="text-preset-6 font-normal text-neutral-600">
          Log in to continue tracking your mood and sleep.
        </p>
      </Stack>
      <div>
        <form onSubmit={handleSubmit}>
          <Stack gap="250">
            <Stack gap="100">
              <label className="text-preset-6 text-neutral-900">Email</label>
              <Input
                type="text"
                placeholder="name@gmail.com"
                value={email}
                onChange={handleChangeEmail}
                error={emailError}
              />
              {emailError && (
                <p className="text-preset-7 text-red-600">* {emailError}</p>
              )}
            </Stack>
            <Stack gap="100">
              <label className="text-preset-6 text-neutral-900">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleChangePassword}
                  error={error}
                  className="pr-16"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-preset-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors font-medium"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Stack>
            {error && (
              <p className="text-preset-7 text-red-600">* {error}</p>
            )}
          </Stack>
        </form>
      </div>
      <Stack gap="250">
        <button
          type="submit"
          disabled={loading}
          className="py-150 px-400 w-full bg-blue-600 text-neutral-0 rounded-10 text-preset-5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          onClick={handleSubmit}
        >
          {loading ? "Đang xử lý..." : "Log in"}
        </button>
        <div className="flex items-center justify-center text-center">
          <p className="flex gap-2 text-preset-6 text-neutral-600">
            Haven't got an account?
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleSwithMode("signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </Stack>
    </Stack>
  );
}
