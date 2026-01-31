import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";

const MoodTrackProgress = () => {
  const loopArray = Array(4).fill(null);
  const { modalState } = useMood();
  return (
    <Stack className="w-full" direction="row" gap="200">
      {loopArray.map((_, index: number) => {
        return (
          <div
            key={index}
            className={`${
              modalState?.currentStep && modalState.currentStep >= index + 1
                ? "bg-blue-600"
                : "bg-blue-200"
            } w-full h-075  rounded-full `}
          ></div>
        );
      })}
    </Stack>
  );
};
export default MoodTrackProgress;
