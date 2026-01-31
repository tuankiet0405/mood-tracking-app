type Mood = {
  index: number;
  detail: string;
  icon: string;
};

export const MOODS_ARRAY: Mood[] = [
  {
    index: 1,
    detail: "Very happy",
    icon: "/images/icon-very-happy-color.svg",
  },
  {
    index: 2,
    detail: " Happy",
    icon: "/images/icon-happy-color.svg",
  },
  {
    index: 3,
    detail: "Neutral",
    icon: "/images/icon-neutral-color.svg",
  },
  {
    index: 4,
    detail: "Sad",
    icon: "/images/icon-sad-color.svg",
  },
  {
    index: 5,
    detail: "Very sad",
    icon: "/images/icon-very-sad-color.svg",
  },
];
