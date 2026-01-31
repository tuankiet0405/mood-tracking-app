import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";

export const Step3 = () => {
  const { handleSetTodayDetail, todayRecord } = useMood();
  const handleOnInput = (value: string) => {
    handleSetTodayDetail(value);
  };
  return (
    <Stack gap="300">
      <p className="text-preset-3 text-neutral-900">Write about your day... </p>
      <Stack gap="100" className="items-end">
        <textarea
          className="w-full py-150 px-200 text-preset-6 text-neutral-600 rounded-10 bg-neutral-0 border border-neutral-300"
          placeholder="Today i felt..."
          rows={6}
          value={todayRecord.todayDetail}
          onChange={(e) => handleOnInput(e.target.value)}
        />
        <p className="text-preset-8 text-neutral-600"> 0 / 150</p>
      </Stack>
    </Stack>
  );
};
