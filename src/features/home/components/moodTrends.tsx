import { useMemo } from "react";
import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
import {
  getLastNRecords,
  getMoodIconWhite,
  getMoodBarColor,
  getShortDate,
} from "../utils";

const SLEEP_LEVELS = [
  { value: 5, label: "9+ hours" },
  { value: 4, label: "7-8 hours" },
  { value: 3, label: "5-6 hours" },
  { value: 2, label: "3-4 hours" },
  { value: 1, label: "0-2 hours" },
];

const getBarHeight = (sleepValue: number): string => {
  return `${sleepValue * 20}%`;
};

const MoodTrends = () => {
  const { MoodRecords } = useMood();

  const chartData = useMemo(() => {
    const records = getLastNRecords(MoodRecords, 7);
    return records.reverse();
  }, [MoodRecords]);

  const hasData = chartData.length > 0;

  return (
    <Stack gap="250">
      <h3 className="text-preset-3">Mood and sleep trends</h3>

      {!hasData ? (
        <Stack className="py-400 items-center justify-center">
          <p className="text-preset-6 text-neutral-600">
            No data yet. Start tracking your mood to see trends!
          </p>
        </Stack>
      ) : (
        <Stack direction="row" gap="100" className="w-full">
          <Stack gap="0" className="shrink-0 justify-between h-[200px]">
            {SLEEP_LEVELS.map((level) => (
              <Stack
                key={level.value}
                className="items-center h-[40px] justify-center"
                direction="row"
                gap="050"
              >
                <img src="/images/icon-sleep.svg" className="w-3 h-3" alt="" />
                <p className="text-preset-9 text-neutral-600 whitespace-nowrap">
                  {level.label}
                </p>
              </Stack>
            ))}
          </Stack>

          <div className="flex-1 overflow-x-auto">
            <div
              className="min-w-fit"
              style={{ minWidth: `${chartData.length * 70}px` }}
            >
              <div className="relative h-[200px]">
                <div className="absolute inset-0 flex flex-col justify-between h-[200px]">
                  {SLEEP_LEVELS.map((level) => (
                    <div
                      key={level.value}
                      className="w-full h-px bg-blue-100"
                    />
                  ))}
                </div>

                <Stack
                  direction="row"
                  gap="150"
                  className="relative h-full items-end justify-around"
                >
                  {chartData.map((record, index) => {
                    const sleepValue = record.sleepHours?.value || 1;
                    const moodIndex = record.todayMood?.index || 3;

                    return (
                      <div
                        key={record.id || index}
                        className="w-[50px] shrink-0 h-full flex items-end justify-center"
                      >
                        <div
                          className={`w-10 rounded-full ${getMoodBarColor(moodIndex)} transition-all duration-300 flex flex-col items-center pt-2`}
                          style={{ height: getBarHeight(sleepValue) }}
                        >
                          <img
                            src={getMoodIconWhite(moodIndex)}
                            alt="mood"
                            className="w-6 h-6 shrink-0"
                          />
                        </div>
                      </div>
                    );
                  })}
                </Stack>
              </div>

              <Stack direction="row" gap="150" className="justify-around mt-2">
                {chartData.map((record, index) => (
                  <p
                    key={record.id || index}
                    className="w-[50px] shrink-0 text-preset-9 text-neutral-600 text-center whitespace-pre-line"
                  >
                    {getShortDate(record.date)}
                  </p>
                ))}
              </Stack>
            </div>
          </div>
        </Stack>
      )}
    </Stack>
  );
};

export default MoodTrends;
