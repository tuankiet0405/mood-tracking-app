import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
import SelectMood from "../ui/SelectMood";
import { MOODS_ARRAY } from "../contants";
const Step1 = () => {
  const { todayRecord, handleSetTodayMood } = useMood();
  const handleSelect = (index: number, title: string) => {
    handleSetTodayMood({
      index,
      detail: title,
    });
  };
  const activeIndex = todayRecord?.todayMood?.index;
  return (
    <Stack gap="300">
      <p className="text-preset-3 text-neutral-900">How was your mood today?</p>
      <Stack direction="col" gap="150">
        {MOODS_ARRAY.map((item) => {
          return (
            <SelectMood
              title={item.detail}
              icon={item.icon}
              index={item.index}
              isSelected={Boolean(activeIndex === item.index)}
              onSelect={handleSelect}
              key={item.index}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Step1;
