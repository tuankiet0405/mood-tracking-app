import clsx from "clsx";
import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";

const SLEEPHOURS = [
  {
    value: 1,
    label: "0-2 hours",
    minSleepHour: 0,
    maxSleepHour: 2,
  },
  {
    value: 2,
    label: "3-4 hours",
    minSleepHour: 3,
    maxSleepHour: 4,
  },
  {
    value: 3,
    label: "5-6 hours",
    minSleepHour: 5,
    maxSleepHour: 6,
  },
  {
    value: 4,
    label: "7-8 hours",
    minSleepHour: 7,
    maxSleepHour: 8,
  },
  {
    value: 5,
    label: "9+ hours",
    minSleepHour: 9,
    maxSleepHour: null,
  },
];
export const Step4 = () => {
  const { todayRecord, handleSetTodaySleepHours } = useMood();
  const sleepHours = todayRecord.sleepHours;
  const onChecked = (
    value: number,
    minHours: number,
    maxHours: number | null,
  ) => {
    handleSetTodaySleepHours({
      value,
      minSleepHour: minHours,
      maxSleepHour: maxHours,
    });
  };
  return (
    <Stack gap="150">
      {SLEEPHOURS.map((item) => {
        return (
          <div>
            <input type="radio" className="peer hidden" />
            <label
              className="flex items-center gap-150 py-200 px-250 border border-blue-200 rounded-10"
              onClick={() =>
                onChecked(item.value, item.minSleepHour, item.maxSleepHour)
              }
            >
              <div
                className={clsx(
                  "relative w-5 h-5  rounded-full transition-all",
                  item.value === sleepHours?.value
                    ? "bg-blue-600"
                    : "bg-blue-200",
                )}
              >
                <div
                  className={clsx(
                    "rounded-full bg-neutral-0 absolute  top-1/2 left-1/2 -translate-1/2 transition-all ",
                    item.value === sleepHours?.value
                      ? "w-2.5 h-2.5"
                      : "w-3.5 h-3.5",
                  )}
                ></div>
              </div>
              <span className="text-preset-5 text-neutral-900">
                {item.label}
              </span>
            </label>
          </div>
        );
      })}
    </Stack>
  );
};
