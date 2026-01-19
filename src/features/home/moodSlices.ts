import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export type MoodRecord = {
  id: string;
  todayMood: {
    index: number;
    detail: string;
  };
  tagFeels: string[];
  todayDetail: string;
  minSleepHour: number;
  maxSleepHour: number;
  date: string;
};
export type MoodModalState = {
  currentStep: number | undefined;
};
export type MoodState = {
  MoodRecords: MoodRecord[];
  todayRecord: MoodRecord | null;
  isShowModal: boolean;
  modalState: MoodModalState;
  error: string | null;
  loading: boolean;
};
const initialState: MoodState = {
  MoodRecords: [],
  todayRecord: null,
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
        (item) => item.id !== action.payload
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
      state.todayRecord = found;
    },
    setTodayRecord(state, action: PayloadAction<MoodRecord>) {
      const date = new Date();
      state.todayRecord = {
        ...state.todayRecord,
        ...action.payload,
        date: date.toISOString(),
      };
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});
export const {
  addMoodRecord,
  deleteMoodRecordById,
  setTodayRecord,
  toggleModal,
  setError,
  setLoading,
  setDefaultTodayRecord,
} = moodSlice.actions;
export default moodSlice.reducer;
