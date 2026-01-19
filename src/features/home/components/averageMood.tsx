import { Stack } from "../../../components/stack";

const AverageMood = () => {
  return (
    <Stack gap="150">
      <h6>
        <span className="text-neutral-900 text-preset-5">Average Mood</span>{" "}
        <span className="text-preset-7 text-neutral-600">
          (Last 5 check-ins)
        </span>
      </h6>
      <Stack className="px-200 py-400 bg-blue-100 rounded-16" gap="150">
        <p className="text-neutral-900 text-preset-6">Keep tracking</p>
        <p className="text-neutral-900 text-preset-7">
          Log 5 check-ins to see your average mood.
        </p>
      </Stack>
    </Stack>
  );
};
export default AverageMood;
