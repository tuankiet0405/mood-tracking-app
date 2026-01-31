import { useMemo } from "react";
import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
import {
  calculateAverageSleep,
  getLastNRecords,
  getTrend,
  getTrendIcon,
} from "../utils";

const AverageSleep = () => {
  const { MoodRecords } = useMood();

  const { averageSleep, trend, hasEnoughData } = useMemo(() => {
    const last5Records = getLastNRecords(MoodRecords, 5);
    const hasEnough = last5Records.length >= 5;

    if (!hasEnough || last5Records.length === 0) {
      return { averageSleep: null, trend: null, hasEnoughData: false };
    }

    const avgSleep = calculateAverageSleep(last5Records);

    const previousRecords = getLastNRecords(MoodRecords, 10).slice(5);
    const prevAvgSleep = calculateAverageSleep(previousRecords);

    let trendType = null;
    if (avgSleep && prevAvgSleep) {
      trendType = getTrend(avgSleep.average, prevAvgSleep.average);
    }

    return { averageSleep: avgSleep, trend: trendType, hasEnoughData: true };
  }, [MoodRecords]);

  return (
    <Stack gap="150">
      <h6>
        <span className="text-neutral-900 text-preset-5">Average Sleep</span>{" "}
        <span className="text-preset-7 text-neutral-600">
          (Last 5 check-ins)
        </span>
      </h6>

      {!hasEnoughData ? (
        <Stack className="px-200 py-150 bg-blue-100 rounded-16" gap="150">
          <p className="text-neutral-900 text-preset-6">Not enough data yet!</p>
          <p className="text-neutral-900 text-preset-7">
            Track {5 - MoodRecords.length} more night
            {5 - MoodRecords.length !== 1 ? "s" : ""} to view average sleep.
          </p>
        </Stack>
      ) : (
        <Stack className="px-200 py-150 bg-blue-600 rounded-16" gap="100">
          <Stack direction="row" gap="100" className="items-center">
            <img
              src="/images/icon-sleep.svg"
              alt="sleep"
              className="w-250 h-250"
            />
            <span className="text-neutral-0 text-preset-5">
              {averageSleep?.label || "5-6 hours"}
            </span>
          </Stack>
          {trend && (
            <Stack direction="row" gap="075" className="items-center">
              <img
                src={getTrendIcon(trend)}
                alt={trend}
                className="w-150 h-150"
              />
              <span className="text-neutral-0 text-preset-7">
                {trend === "same"
                  ? "Same as the previous 5 check-ins"
                  : trend === "increase"
                    ? "Increase from the previous 5 check-ins"
                    : "Decrease from the previous 5 check-ins"}
              </span>
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default AverageSleep;
