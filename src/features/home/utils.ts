import { MOODQUOTES } from "../../constants/moodQuote";
import type { MoodRecord } from "./moodSlices";

const MOOD_ICONS: Record<number, string> = {
  1: "/images/icon-very-happy-color.svg",
  2: "/images/icon-happy-color.svg",
  3: "/images/icon-neutral-color.svg",
  4: "/images/icon-sad-color.svg",
  5: "/images/icon-very-sad-color.svg",
};

const MOOD_ICONS_WHITE: Record<number, string> = {
  1: "/images/icon-very-happy-white.svg",
  2: "/images/icon-happy-white.svg",
  3: "/images/icon-neutral-white.svg",
  4: "/images/icon-sad-white.svg",
  5: "/images/icon-very-sad-white.svg",
};
  
const MOOD_BAR_COLORS: Record<number, string> = {
  1: "bg-yellow-400",
  2: "bg-blue-400",
  3: "bg-green-400",
  4: "bg-orange-400",
  5: "bg-red-400",
};

const MOOD_LABELS: Record<number, string> = {
  1: "Very Happy",
  2: "Happy",
  3: "Neutral",
  4: "Sad",
  5: "Very Sad",
};

const SLEEP_LABELS: Record<number, string> = {
  1: "0-2 hours",
  2: "3-4 hours",
  3: "5-6 hours",
  4: "7-8 hours",
  5: "9+ hours",
};

const moodIndexToQuoteKey = (index: number): keyof typeof MOODQUOTES => {
  const mapping: Record<number, keyof typeof MOODQUOTES> = {
    1: "2",
    2: "1",
    3: "0",
    4: "-1",
    5: "-2",
  };
  return mapping[index] || "0";
};

export const getMoodIcon = (index: number): string => {
  return MOOD_ICONS[index] || MOOD_ICONS[3];
};

export const getMoodIconWhite = (index: number): string => {
  return MOOD_ICONS_WHITE[index] || MOOD_ICONS_WHITE[3];
};

export const getMoodBarColor = (index: number): string => {
  return MOOD_BAR_COLORS[index] || MOOD_BAR_COLORS[3];
};

export const getMoodLabel = (index: number): string => {
  return MOOD_LABELS[index] || MOOD_LABELS[3];
};

export const getMoodQuote = (index: number): string => {
  const key = moodIndexToQuoteKey(index);
  const quotes = MOODQUOTES[key];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const getSleepLabel = (value: number): string => {
  return SLEEP_LABELS[value] || "";
};

export const calculateAverageMood = (
  records: MoodRecord[],
): { average: number; label: string } | null => {
  if (records.length === 0) return null;

  const sum = records.reduce((acc, record) => {
    return acc + (record.todayMood?.index || 3);
  }, 0);

  const avg = sum / records.length;
  const roundedAvg = Math.round(avg);

  return {
    average: roundedAvg,
    label: MOOD_LABELS[roundedAvg] || "Neutral",
  };
};

export const calculateAverageSleep = (
  records: MoodRecord[],
): { average: number; label: string } | null => {
  if (records.length === 0) return null;

  const validRecords = records.filter((r) => r.sleepHours?.value !== null);
  if (validRecords.length === 0) return null;

  const sum = validRecords.reduce((acc, record) => {
    return acc + (record.sleepHours?.value || 3);
  }, 0);

  const avg = sum / validRecords.length;
  const roundedAvg = Math.round(avg);

  return {
    average: roundedAvg,
    label: SLEEP_LABELS[roundedAvg] || "5-6 hours",
  };
};

export type TrendType = "increase" | "decrease" | "same";

export const getTrend = (current: number, previous: number): TrendType => {
  if (current > previous) return "increase";
  if (current < previous) return "decrease";
  return "same";
};

export const getTrendIcon = (trend: TrendType): string => {
  const icons: Record<TrendType, string> = {
    increase: "/images/icon-trend-increase.svg",
    decrease: "/images/icon-trend-decrease.svg",
    same: "/images/icon-trend-same.svg",
  };
  return icons[trend];
};

export const getLastNRecords = (
  records: MoodRecord[],
  n: number,
): MoodRecord[] => {
  return [...records]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  return `${month}\n${day < 10 ? "0" + day : day}`;
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

export const getTodayRecord = (records: MoodRecord[]): MoodRecord | null => {
  return records.find((record) => isToday(record.date)) || null;
};
