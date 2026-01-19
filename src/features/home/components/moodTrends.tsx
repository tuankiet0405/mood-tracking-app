import { Stack } from "../../../components/stack";

const MoodTrends = () => {
  return (
    <Stack gap="250">
      <h3 className="text-preset-3">Mood and sleep trends</h3>
      <Stack direction="col">
        <Stack gap="500" className="shrink-0 w-full">
          <Stack className="items-center" direction="row" gap="200">
            <Stack className="shrink-0 items-center" direction="row">
              <span>
                <img src="/images/icon-sleep.svg" className="w-125 h-125" />
              </span>
              <p className="text-preset-9 text-neutral-600">9+ hours</p>
            </Stack>
            <div className="w-full h-px bg-blue-100"></div>
          </Stack>
          <Stack className="items-center" direction="row" gap="200">
            <Stack className="shrink-0 items-center " direction="row">
              <span>
                <img src="/images/icon-sleep.svg" className="w-125 h-125" />
              </span>
              <p className="text-preset-9 text-neutral-600">7-8 hours</p>
            </Stack>
            <div className="w-full h-px bg-blue-100"></div>
          </Stack>
          <Stack className="items-center" direction="row" gap="200">
            <Stack className="shrink-0 items-center" direction="row">
              <span>
                <img src="/images/icon-sleep.svg" className="w-125 h-125" />
              </span>
              <p className="text-preset-9 text-neutral-600">5-6 hours</p>
            </Stack>
            <div className="w-full h-px bg-blue-100"></div>
          </Stack>
          <Stack className="items-center" direction="row" gap="200">
            <Stack className="shrink-0 items-center" direction="row">
              <span>
                <img src="/images/icon-sleep.svg" className="w-125 h-125" />
              </span>
              <p className="text-preset-9 text-neutral-600">3-4 hours</p>
            </Stack>
            <div className="w-full h-px bg-blue-100"></div>
          </Stack>
          <Stack className="items-center" direction="row" gap="200">
            <Stack className="shrink-0 items-center" direction="row">
              <span>
                <img src="/images/icon-sleep.svg" className="w-125 h-125" />
              </span>
              <p className="text-preset-9 text-neutral-600">0-2 hours</p>
            </Stack>
            <div className="w-full h-px bg-blue-100"></div>
          </Stack>
        </Stack>
        <div className="w-full ">
          <div className="mt-3">
            <Stack gap="600"></Stack>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};

export default MoodTrends;
