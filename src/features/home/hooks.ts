import { useAppDispatch, useAppSelector } from "../../globalHooks";
import {
  addMoodRecord,
  deleteMoodRecordById,
  setCurrentStep,
  setError,
  setTodayDetail,
  setTodayMood,
  setTodaySleepHours,
  setTodayTagFeels,
  toggleModal,
  saveTodayRecord,
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

  const handleSetTodayMood = (record: MoodRecord["todayMood"]) =>
    dispatch(setTodayMood(record));
  const handleSetTodayTagFeels = (record: MoodRecord["tagFeels"]) =>
    dispatch(setTodayTagFeels(record));
  const handleSetTodayDetail = (record: MoodRecord["todayDetail"]) =>
    dispatch(setTodayDetail(record));

  const handleSetTodaySleepHours = (record: MoodRecord["sleepHours"]) =>
    dispatch(setTodaySleepHours(record));

  const handleOpenModal = () => {
    if (isShowModal) return;
    else {
      dispatch(toggleModal());
      dispatch(setCurrentStep(1));
    }
  };
  const handleCloseModal = () => {
    if (isShowModal) dispatch(toggleModal());
  };

  const increaseCurrentStep = () => {
    let currentStep = modalState.currentStep || 0;

    if (currentStep >= 4) {
      handleCloseModal();
      return;
    }
    dispatch(setCurrentStep((currentStep += 1)));
  };

  const descreaseCurrentStep = () => {
    let currentStep = modalState.currentStep || 0;
    if (currentStep <= 1) return;
    dispatch(setCurrentStep((currentStep -= 1)));
  };

  const handleSaveTodayRecord = () => {
    dispatch(saveTodayRecord());
  };

  return {
    MoodRecords,
    todayRecord,
    modalState,
    isShowModal,
    error,
    loading,
    handleAddMoodRecords,
    handleDeleteMoodRecord,
    handleSetTodayMood,
    handleSetTodayTagFeels,
    handleSetTodayDetail,
    handleSetTodaySleepHours,
    handleSetError,
    handleOpenModal,
    handleCloseModal,
    increaseCurrentStep,
    descreaseCurrentStep,
    handleSaveTodayRecord,
  };
}
