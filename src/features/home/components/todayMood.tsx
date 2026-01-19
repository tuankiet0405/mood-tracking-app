import { Stack } from "../../../components/stack";

const TodayMood = () => {
  return (
    <Stack className="items-center">
      <button className=" px-400 py-200 rounded-10 bg-blue-600 text-preset-5 text-neutral-0 w-fit mb-800">
        Log today's mood
      </button>
    </Stack>
  );
};

export default TodayMood;
