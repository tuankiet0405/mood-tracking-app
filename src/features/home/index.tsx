import { Stack } from "../../components/stack";
import SectionBackground from "./ui/SectionBackground";
import AverageMood from "./components/averageMood";
import AverageSleep from "./components/averageSleep";
import Title from "./components/title";
import TodayMood from "./components/todayMood";
import MoodTrends from "./components/moodTrends";
import MoodTrackModal from "./components/moodTrackModal";
export default function Home() {
  return (
    <Stack className="h-auto min-h-dvh py-400 px-200 background-auth" gap="600">
      <header>
        <Stack direction="row" className="justify-between">
          <img src="/images/logo.svg" className="h-500 w-fit " />
          <Stack>
            <img
              src="/images/avatar-placeholder.svg"
              className="w-500 h-500 rounded-full"
            />
          </Stack>
        </Stack>
      </header>
      <Stack gap="600">
        <Title />
        <TodayMood />
        <SectionBackground>
          <Stack gap="300">
            <AverageMood />
            <AverageSleep />
          </Stack>
        </SectionBackground>
        <SectionBackground>
          <MoodTrends />
        </SectionBackground>
      </Stack>
      <MoodTrackModal />
    </Stack>
  );
}
