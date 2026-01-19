import { Stack } from "../../../components/stack";
import Modal from "../ui/Modal";
import MoodTrackProgress from "./moodTrackProgress";
import Step1 from "./moodTrackStep1";

const MoodTrackModal = () => {
  return (
    <Modal>
      <Stack gap="300">
        <p className="text-preset-3 ">Log your mood</p>
        <MoodTrackProgress />
        <Step1 />
        <button className=" bg-blue-600 text-neutral-0 text-center py-200 rounded-10 text-preset-4-semi">
          Continue
        </button>
      </Stack>
    </Modal>
  );
};

export default MoodTrackModal;
