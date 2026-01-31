import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export type MoodRecord = {
  id: string | number;
  todayMood: {
    index: number;
    detail: string;
  };
  tagFeels: string[];
  todayDetail: string;
  sleepHours: {
    value: number | null;
    minSleepHour: number | null;
    maxSleepHour: number | null;
  };
  date: string;
};
export type MoodModalState = {
  currentStep: number | undefined;
};
export type MoodState = {
  MoodRecords: MoodRecord[];
  todayRecord: Partial<MoodRecord>;
  isShowModal: boolean;
  modalState: MoodModalState;
  error: string | null;
  loading: boolean;
};
const daysAgo = (n: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString();
};

const EXAMPLE_RECORDS: MoodRecord[] = [
  {
    id: 1,
    todayMood: { index: 1, detail: "Very happy" },
    tagFeels: ["joyful", "grateful", "excited"],
    todayDetail: "Had an amazing day! Everything went perfectly.",
    sleepHours: { value: 5, minSleepHour: 9, maxSleepHour: null },
    date: daysAgo(9),
  },
  {
    id: 2,
    todayMood: { index: 2, detail: "Happy" },
    tagFeels: ["calm", "content", "peaceful"],
    todayDetail: "Good productive day at work.",
    sleepHours: { value: 4, minSleepHour: 7, maxSleepHour: 8 },
    date: daysAgo(8),
  },
  {
    id: 3,
    todayMood: { index: 3, detail: "Neutral" },
    tagFeels: ["tired", "calm"],
    todayDetail: "Just a regular day, nothing special.",
    sleepHours: { value: 3, minSleepHour: 5, maxSleepHour: 6 },
    date: daysAgo(7),
  },
  {
    id: 4,
    todayMood: { index: 4, detail: "Sad" },
    tagFeels: ["anxious", "stressed", "overwhelmed"],
    todayDetail: "Feeling a bit down today.",
    sleepHours: { value: 2, minSleepHour: 3, maxSleepHour: 4 },
    date: daysAgo(6),
  },
  {
    id: 5,
    todayMood: { index: 5, detail: "Very sad" },
    tagFeels: ["lonely", "down", "tired"],
    todayDetail: "Rough day, need some rest.",
    sleepHours: { value: 1, minSleepHour: 0, maxSleepHour: 2 },
    date: daysAgo(5),
  },
  {
    id: 6,
    todayMood: { index: 2, detail: "Happy" },
    tagFeels: ["hopeful", "motivated", "confident"],
    todayDetail: "Feeling better today!",
    sleepHours: { value: 4, minSleepHour: 7, maxSleepHour: 8 },
    date: daysAgo(4),
  },
  {
    id: 7,
    todayMood: { index: 1, detail: "Very happy" },
    tagFeels: ["joyful", "excited", "grateful"],
    todayDetail: "Great news today! So excited!",
    sleepHours: { value: 5, minSleepHour: 9, maxSleepHour: null },
    date: daysAgo(3),
  },
  {
    id: 8,
    todayMood: { index: 3, detail: "Neutral" },
    tagFeels: ["calm", "content"],
    todayDetail: "Quiet weekend at home.",
    sleepHours: { value: 4, minSleepHour: 7, maxSleepHour: 8 },
    date: daysAgo(2),
  },
  {
    id: 9,
    todayMood: { index: 2, detail: "Happy" },
    tagFeels: ["peaceful", "grateful", "content"],
    todayDetail: "Nice relaxing day.",
    sleepHours: { value: 5, minSleepHour: 9, maxSleepHour: null },
    date: daysAgo(1),
  },

];

const initialState: MoodState = {
  MoodRecords: EXAMPLE_RECORDS,
  todayRecord: {
    id: Date.now(),
    todayMood: undefined,
    tagFeels: [],
    todayDetail: "",
    sleepHours: {
      value: null,
      minSleepHour: null,
      maxSleepHour: null,
    },
    date: new Date().toISOString(),
  },
  isShowModal: false,
  modalState: {
    currentStep: undefined,
  },
  loading: false,
  error: null,
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    toggleModal(state) {
      state.isShowModal = !state.isShowModal;
    },
    addMoodRecord(state, action: PayloadAction<MoodRecord>) {
      if (action.payload) state.MoodRecords.push(action.payload);
    },
    deleteMoodRecordById(state, action: PayloadAction<string>) {
      state.MoodRecords = state.MoodRecords.filter(
        (item) => item.id !== action.payload,
      );
    },
    setDefaultTodayRecord(state) {
      const today = new Date();
      const isSameDay = (aIso: string, b: Date) => {
        const a = new Date(aIso);
        return (
          a.getFullYear() === b.getFullYear() &&
          a.getMonth() === b.getMonth() &&
          a.getDate() === b.getDate()
        );
      };

      const found =
        state.MoodRecords.find((item) => isSameDay(item.date, today)) ?? null;
      if (found) state.todayRecord = found;
    },
    setTodayRecord(state, action: PayloadAction<Partial<MoodRecord>>) {
      const date = new Date();
      state.todayRecord = {
        ...state.todayRecord,
        ...action.payload,
        date: date.toISOString(),
      };
    },
    setTodayMood(state, action: PayloadAction<MoodRecord["todayMood"]>) {
      state.todayRecord.todayMood = action.payload;
    },
    setTodayTagFeels(state, action: PayloadAction<MoodRecord["tagFeels"]>) {
      console.log(state.todayRecord.tagFeels);
      state.todayRecord.tagFeels = action.payload;
    },
    setTodayDetail(state, action: PayloadAction<MoodRecord["todayDetail"]>) {
      state.todayRecord.todayDetail = action.payload;
    },
    setTodaySleepHours(state, action: PayloadAction<MoodRecord["sleepHours"]>) {
      state.todayRecord.sleepHours = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setCurrentStep(state, action: PayloadAction<number>) {
      state.modalState.currentStep = action.payload;
    },
    saveTodayRecord(state) {
      const todayRecord = state.todayRecord as MoodRecord;
      if (!todayRecord.todayMood || !todayRecord.sleepHours?.value) return;

      const today = new Date();
      const isSameDay = (aIso: string, b: Date) => {
        const a = new Date(aIso);
        return (
          a.getFullYear() === b.getFullYear() &&
          a.getMonth() === b.getMonth() &&
          a.getDate() === b.getDate()
        );
      };

      const existingIndex = state.MoodRecords.findIndex((item) =>
        isSameDay(item.date, today),
      );

      if (existingIndex !== -1) {
        state.MoodRecords[existingIndex] = {
          ...todayRecord,
          id: state.MoodRecords[existingIndex].id,
        };
      } else {
        state.MoodRecords.push({
          ...todayRecord,
          id: Date.now(),
          date: today.toISOString(),
        });
      }

      state.todayRecord = {
        id: Date.now(),
        todayMood: undefined,
        tagFeels: [],
        todayDetail: "",
        sleepHours: {
          value: null,
          minSleepHour: null,
          maxSleepHour: null,
        },
        date: new Date().toISOString(),
      };

      state.isShowModal = false;
      state.modalState.currentStep = undefined;
    },
  },
});
export const {
  addMoodRecord,
  deleteMoodRecordById,
  setTodayRecord,
  setTodayMood,
  setTodayTagFeels,
  setTodayDetail,
  setTodaySleepHours,
  toggleModal,
  setError,
  setLoading,
  setCurrentStep,
  setDefaultTodayRecord,
  saveTodayRecord,
} = moodSlice.actions;
export default moodSlice.reducer;
