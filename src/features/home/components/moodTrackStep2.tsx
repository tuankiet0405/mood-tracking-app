import { Stack } from "../../../components/stack";
import { useMood } from "../hooks";
const FEELINGS_ARRAY = [
  {
    value: "joyful",
    label: "Joyful",
  },
  {
    value: "anxious",
    label: "Anxious",
  },
  {
    value: "down",
    label: "Down",
  },
  {
    value: "calm",
    label: "Calm",
  },
  {
    value: "excited",
    label: "Excited",
  },
  {
    value: "frustrated",
    label: "Frustrated",
  },

  {
    value: "lonely",
    label: "Lonely",
  },
  {
    value: "grateful",
    label: "Grateful",
  },
  {
    value: "overwhelmed",
    label: "Overwhelmed",
  },
  {
    value: "motivated",
    label: "Motivated",
  },
  {
    value: "irritable",
    label: "Irritable",
  },
  {
    value: "peaceful",
    label: "Peaceful",
  },
  {
    value: "tired",
    label: "Tired",
  },
  {
    value: "hopeful",
    label: "Hopeful",
  },
  {
    value: "confident",
    label: "Confident",
  },
  {
    value: "stressed",
    label: "Stressed",
  },
  {
    value: "content",
    label: "Content",
  },
  {
    value: "disappointed",
    label: "Disappointed",
  },
  {
    value: "optimistic",
    label: "Optimistic",
  },
  {
    value: "restless",
    label: "Restless",
  },
];
const Step2 = () => {
  const { todayRecord, handleSetTodayTagFeels } = useMood();
  const tagFeels = todayRecord?.tagFeels || [];
  const handleCheck = (isCheck: boolean, value: string) => {
    let nextTagFeels = [...(todayRecord?.tagFeels || [])];

    if (!isCheck) {
      nextTagFeels = nextTagFeels.filter((item) => item !== value);
    } else {
      if (nextTagFeels.length >= 3) {
        nextTagFeels = nextTagFeels.slice(1);
      }
      nextTagFeels = [...nextTagFeels, value];
    }

    handleSetTodayTagFeels(nextTagFeels);
  };
  return (
    <Stack gap="300" className="h-full overflow-y-hidden">
      <Stack gap="075">
        <p className="text-preset-3 text-neutral-900">How did you feel? </p>
        <p className="text-preset-6 text-neutral-600">
          Select up to three tags:
        </p>
      </Stack>
      <Stack
        direction="row"
        canWrap={true}
        className="gap-y-150 gap-x-200 h-full overflow-y-auto"
      >
        {FEELINGS_ARRAY.map((item) => {
          return (
            <Stack
              direction="row"
              gap="100"
              className="w-fit px-200 py-150  border border-blue-100 rounded-10 bg-neutral-0 justify-between items-center"
              key={item.value}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    checked={tagFeels?.includes(item.value)}
                    type="checkbox"
                    className="peer appearance-none w-4 h-4 border border-blue-200 rounded bg-white checked:bg-blue-600 transition-colors"
                    onChange={(e) => {
                      handleCheck(e.target.checked, item.value);
                    }}
                  />
                  <svg
                    className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">{item.label}</span>
              </label>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Step2;
