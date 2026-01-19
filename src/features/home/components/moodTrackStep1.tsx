import { Stack } from "../../../components/stack";
import SelectMood from "../ui/SelectMood";

const Step1 = () => {
  return (
    <Stack gap="300">
      <p className="text-preset-3 text-neutral-900">How was your mood today?</p>
      <Stack direction="col" gap="150">
        <SelectMood
          title="Very Happy"
          icon="/images/icon-very-happy-color.svg"
        />
        <SelectMood title="Happy" icon="/images/icon-happy-color.svg" />
        <SelectMood title="Neutral" icon="/images/icon-neutral-color.svg" />
        <SelectMood title="Sad" icon="/images/icon-sad-color.svg" />
        <SelectMood title="Very sad" icon="/images/icon-very-sad-color.svg" />
      </Stack>
    </Stack>
  );
};

export default Step1;
