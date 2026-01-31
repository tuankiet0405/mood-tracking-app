import { useMemo } from "react";
import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
import {
  getMoodIcon,
  getMoodQuote,
  getSleepLabel,
  getTodayRecord,
} from "../utils";

const TodayMood = () => {
  const { handleOpenModal, MoodRecords } = useMood();

  const todayRecord = useMemo(() => getTodayRecord(MoodRecords), [MoodRecords]);

  const moodQuote = useMemo(() => {
    if (!todayRecord?.todayMood?.index) return "";
    return getMoodQuote(todayRecord.todayMood.index);
  }, [todayRecord?.todayMood?.index]);

  const hasRecord = todayRecord !== null;

  if (!hasRecord) {
    return (
      <Stack className="items-center">
        <button
          className="px-400 py-200 rounded-10 bg-blue-600 text-preset-5 text-neutral-0 w-fit mb-800"
          onClick={handleOpenModal}
        >
          Log today's mood
        </button>
      </Stack>
    );
  }

  const moodIcon = getMoodIcon(todayRecord.todayMood?.index || 3);
  const sleepLabel = getSleepLabel(todayRecord.sleepHours?.value || 3);
  const tagFeels = todayRecord.tagFeels || [];
  const reflection = todayRecord.todayDetail || "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-300">
      <div className="p-400 bg-neutral-0 rounded-16 lg:col-span-7 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-400 h-full items-center lg:items-start">
          <Stack gap="050" className="text-center md:text-left">
            <p className="text-preset-3 text-neutral-600">I'm feeling</p>
            <p className="text-preset-2 text-neutral-900 text-nowrap">
              {todayRecord.todayMood?.detail || "Neutral"}
            </p>
          </Stack>
          <div className="relative flex items-center justify-center h-[200px] sm:h-[280px] sm:row-span-2">
            <img
              src={moodIcon}
              alt="mood"
              className="h-[200px] mx-auto sm:h-[320px] w-full sm:absolute sm:top-10 sm:left-0"
            />
          </div>
          <Stack
            gap="100"
            className="mt-auto items-center sm:flex-row sm:items-start"
          >
            <img
              src="/images/icon-quote.svg"
              alt="quote"
              className="size-300 shrink-0"
            />
            <p className="text-preset-6 text-neutral-900 italic">
              "{moodQuote}"
            </p>
          </Stack>
        </div>
      </div>

      <Stack gap="300" className="lg:col-span-5">
        <div className="p-200 bg-neutral-0 rounded-16">
          <Stack gap="100">
            <Stack direction="row" gap="100" className="items-center">
              <img
                src="/images/icon-sleep.svg"
                alt="sleep"
                className="w-200 h-200"
              />
              <span className="text-preset-6 text-neutral-600">Sleep</span>
            </Stack>
            <p className="text-preset-3 text-neutral-900">{sleepLabel}</p>
          </Stack>
        </div>

        <div className="p-200 bg-neutral-0 rounded-16 h-full">
          <Stack gap="200" className="justify-between h-full">
            <Stack direction="row" gap="100" className="items-center">
              <img
                src="/images/icon-reflection.svg"
                alt="reflection"
                className="w-200 h-200"
              />
              <span className="text-preset-6 text-neutral-600">
                Reflection of the day
              </span>
            </Stack>
            {reflection && (
              <p className="text-preset-6 text-neutral-900 h-full">
                {reflection}
              </p>
            )}
            {tagFeels.length > 0 && (
              <Stack direction="row" gap="100" canWrap>
                {tagFeels.map((tag) => (
                  <span
                    key={tag}
                    className="text-preset-6 italic text-neutral-600"
                  >
                    #{tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </span>
                ))}
              </Stack>
            )}
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default TodayMood;
