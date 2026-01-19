import { useRef, useState } from "react";
import { Input } from "../../../components/input";
import { Stack } from "../../../components/stack";
import { useAuth } from "../hooks";

const PersonalInfo = () => {
  const { user, handleSetUser } = useAuth();
  
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    if (blobUrl) URL.revokeObjectURL(blobUrl);

    const url = URL.createObjectURL(file);
    setBlobUrl(url);
  };
  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleStartTracking() {
    if (name.trim() === "") return;
    handleSetUser({ ...user, name, image: fileName });
  }
  return (
    <div className="w-full ">
      <Stack gap="400" className="bg-white py-10 px-4 mx-4 rounded-16 ">
        <Stack gap="100">
          <h3 className="text-preset-3 text-neutral-900">
            Personalize your experience{" "}
          </h3>
          <p className="text-preset-6 font-normal text-neutral-600">
            Add your name and a profile picture to make Mood yours.{" "}
          </p>
        </Stack>
        <Stack gap="250" className="w-full">
          <Stack gap="100">
            <label
              htmlFor="name"
              className="text-neutral-900 text-preset-6 font-normal"
            >
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={handleChangeName}
            />
          </Stack>
          <Stack direction="row" gap="250" className="items-center">
            <img
              src={blobUrl || "/images/avatar-placeholder.svg"}
              className="w-800 h-800 shrink-0 rounded-full object-cover"
              alt="avatar"
            />
            <Stack gap="200" className="flex-1 min-w-0">
              <Stack gap="075" className="w-full">
                <p className="text-neutral-900 text-preset-6 truncate">
                  {fileName || "Upload image"}
                </p>
                <p className="text-neutral-600 text-preset-7">
                  Max 250KB, PNG or JPEG
                </p>
              </Stack>
              <input
                type="file"
                accept=".png, .jpg"
                alt="choose file"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              <button
                className="w-fit text-neutral-600 text-preset-6 px-200 py-100 rounded-8 border border-neutral-300"
                onClick={() => inputFileRef.current?.click()}
              >
                Upload
              </button>
            </Stack>
          </Stack>
        </Stack>
        <button
          className="py-150 px-400 w-full bg-blue-600 text-neutral-0 rounded-10 text-preset-5 "
          onClick={handleStartTracking}
        >
          Start tracking
        </button>
      </Stack>
    </div>
  );
};

export default PersonalInfo;
