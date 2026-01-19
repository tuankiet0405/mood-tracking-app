import { Stack } from "../../../components/stack";

const AverageSleep = () => {
  return (
    <Stack gap="150">
      <h6>
        <span className="text-neutral-900 text-preset-5">Average Sleep</span>{" "}
        <span className="text-preset-7 text-neutral-600">
          (Last 5 check-ins)
        </span>
      </h6>
      <Stack className="px-200 py-400 bg-blue-100 rounded-16" gap="150">
        <p className="text-neutral-900 text-preset-6">Not enough data yet!</p>
        <p className="text-neutral-900 text-preset-7">
          Track 5 nights to view average sleep.
        </p>
      </Stack>
    </Stack>
  );
};
export default AverageSleep;
