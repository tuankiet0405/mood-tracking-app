import { useAppDispatch, useAppSelector } from "../../globalHooks";
import {
  addMoodRecord,
  deleteMoodRecordById,
  setError,
  setTodayRecord,
  toggleModal,
  type MoodRecord,
} from "./moodSlices";
export function useUser() {
  const { user } = useAppSelector((state) => state.auth);
  return { user };
}
export function useMood() {
  const dispatch = useAppDispatch();
  const { MoodRecords, todayRecord, error, loading, isShowModal, modalState } =
    useAppSelector((state) => state.mood);
  const handleAddMoodRecords = (record: MoodRecord) =>
    dispatch(addMoodRecord(record));
  const handleDeleteMoodRecord = (id: string) =>
    dispatch(deleteMoodRecordById(id));

  const handleSetError = (error: string) => dispatch(setError(error));

  const handleSetTodayMood = (record: MoodRecord) =>
    dispatch(setTodayRecord(record));

  const handleOpenModal = () => {
    if (isShowModal) return;
    else dispatch(toggleModal());
  };

  const handleCloseModal = () => {
    if (isShowModal) dispatch(toggleModal());
  };

  return {
    MoodRecords,
    todayRecord,
    modalState,
    error,
    loading,
    handleAddMoodRecords,
    handleDeleteMoodRecord,
    handleSetTodayMood,
    handleSetError,
    handleOpenModal,
    handleCloseModal,
  };
}
