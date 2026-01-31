import { useState } from "react";
import { Stack } from "../../components/stack";
import SectionBackground from "./ui/SectionBackground";
import AverageMood from "./components/averageMood";
import AverageSleep from "./components/averageSleep";
import Title from "./components/title";
import TodayMood from "./components/todayMood";
import MoodTrends from "./components/moodTrends";
import MoodTrackModal from "./components/moodTrackModal";
import { useUser } from "./hooks";
import { useAuth } from "../auth/hooks";

export default function Home() {
  const { user } = useUser();
  const { handleLogout, navigate } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <Stack
      className="h-auto min-h-dvh py-400 px-[5%] lg:px-[10%] background-auth"
      gap="600"
    >
      <header>
        <Stack direction="row" className="justify-between items-center">
          <img src="/images/logo.svg" className="h-500 w-fit" alt="logo" />
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="focus:outline-none"
            >
              <img
                src={user?.image || "/images/avatar-placeholder.svg"}
                className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                alt="avatar"
              />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-12 shadow-lg py-2 min-w-[160px] z-50">
                <div className="px-4 py-2 border-b border-neutral-100">
                  <p className="text-preset-6 text-neutral-900 font-medium truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-preset-8 text-neutral-500 truncate">
                    {user?.username}
                  </p>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="w-full px-4 py-2 text-left text-preset-6 text-neutral-700 hover:bg-neutral-100 flex items-center gap-2"
                >
                  <img
                    src="/images/icon-logout.svg"
                    className="w-4 h-4"
                    alt=""
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
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
