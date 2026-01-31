import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
import Modal from "../ui/Modal";
import MoodTrackProgress from "./moodTrackProgress";
import Step1 from "./moodTrackStep1";
import Step2 from "./moodTrackStep2";
import { Step3 } from "./moodTrackStep3";
import { Step4 } from "./moodTrackStep4";
const MoodTrackModal = () => {
  const { isShowModal, increaseCurrentStep, modalState, handleSaveTodayRecord } =
    useMood();
  const currentStep = modalState.currentStep;

  const handleContinue = () => {
    if (currentStep === 4) {
      handleSaveTodayRecord();
    } else {
      increaseCurrentStep();
    }
  };

  if (!isShowModal) return;
  return (
    <Modal>
      <Stack gap="300" className="h-fit  overflow-auto">
        <p className="text-preset-3 ">Log your mood</p>
        <MoodTrackProgress />
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step4 />}
        <button
          className="bg-blue-600 text-neutral-0 text-center py-200 rounded-10 text-preset-4-semi"
          onClick={handleContinue}
        >
          {currentStep === 4 ? "Save" : "Continue"}
        </button>
      </Stack>
    </Modal>
  );
};

export default MoodTrackModal;
