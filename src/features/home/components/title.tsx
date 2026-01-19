import { Stack } from "../../../components/stack";
import { useUser } from "../hooks";

const Title = () => {
  const { user } = useUser();
  return (
    <Stack gap="200" className="items-center">
      <h3 className="text-blue-600 text-preset-4-semi font-bold">
        Hello {user?.name}
      </h3>
      <h1 className="text-preset-1 text-center text-neutral-900">
        How are you feeling today?{" "}
      </h1>
      <p className="text-neutral-600 text-preset-6">
        {new Date().toDateString()}
      </p>
    </Stack>
  );
};

export default Title;
