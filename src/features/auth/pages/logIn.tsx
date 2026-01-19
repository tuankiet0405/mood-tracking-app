import { useState } from "react";
import { Input } from "../../../components/input";
import { Stack } from "../../../components/stack";
import { useAuth } from "../hooks";

export default function SignIn() {
  const { handleSwithMode, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <Stack className="bg-white py-10 px-4 mx-4 rounded-16" gap="400">
      <Stack gap="100">
        <h3 className="text-preset-3 text-neutral-900">Welcome back </h3>
        <p className="text-preset-6 font-normal text-neutral-600">
          Log in to continue tracking your mood and sleep.
        </p>
      </Stack>
      <div>
        <form>
          <Stack gap="250">
            <Stack gap="100">
              <label>Email</label>
              <Input
                type="text"
                placeholder="name@gmail.com"
                value={email}
                onChange={handleChangeEmail}
              />
            </Stack>
            <Stack gap="100">
              <label>Password</label>
              <Input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={handleChangePassword}
              />
            </Stack>
          </Stack>
        </form>
      </div>
      <Stack gap="250">
        <button
          className="py-150 px-400 w-full bg-blue-600 text-neutral-0 rounded-10 text-preset-5 "
          onClick={() => handleLogin(email, password)}
        >
          Log in
        </button>
        <div className="flex items-center justify-center text-center">
          <p className="flex gap-2">
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
