import { useMemo } from "react";
import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
import {
  calculateAverageMood,
  getLastNRecords,
  getMoodIcon,
  getTrend,
  getTrendIcon,
} from "../utils";

const AverageMood = () => {
  const { MoodRecords } = useMood();

  const { averageMood, trend, hasEnoughData } = useMemo(() => {
    const last5Records = getLastNRecords(MoodRecords, 5);
    const hasEnough = last5Records.length >= 5;

    if (!hasEnough || last5Records.length === 0) {
      return { averageMood: null, trend: null, hasEnoughData: false };
    }

    const avgMood = calculateAverageMood(last5Records);

    const previousRecords = getLastNRecords(MoodRecords, 10).slice(5);
    const prevAvgMood = calculateAverageMood(previousRecords);

    let trendType = null;
    if (avgMood && prevAvgMood) {
      trendType = getTrend(prevAvgMood.average, avgMood.average);
    }

    return { averageMood: avgMood, trend: trendType, hasEnoughData: true };
  }, [MoodRecords]);

  return (
    <Stack gap="150">
      <h6>
        <span className="text-neutral-900 text-preset-5">Average Mood</span>{" "}
        <span className="text-preset-7 text-neutral-600">
          (Last 5 check-ins)
        </span>
      </h6>

      {!hasEnoughData ? (
        <Stack className="px-200 py-150 bg-blue-100 rounded-16" gap="150">
          <p className="text-neutral-900 text-preset-6">Keep tracking</p>
          <p className="text-neutral-900 text-preset-7">
            Log {5 - MoodRecords.length} more check-in
            {5 - MoodRecords.length !== 1 ? "s" : ""} to see your average mood.
          </p>
        </Stack>
      ) : (
        <Stack className="px-200 py-150 bg-blue-600 rounded-16" gap="100">
          <Stack direction="row" gap="100" className="items-center">
            <img
              src={getMoodIcon(averageMood?.average || 3)}
              alt="mood"
              className="w-250 h-250"
            />
            <span className="text-neutral-0 text-preset-5">
              {averageMood?.label || "Neutral"}
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

export default AverageMood;
