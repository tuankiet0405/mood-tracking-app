import { useRef, useState } from "react";
import { Input } from "../../../components/input";
import { Stack } from "../../../components/stack";
import { useAuth } from "../hooks";
import { isValidFileSize, isValidName } from "../validation";

const PersonalInfo = () => {
  const { user, handleSetUser } = useAuth();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidFileSize(file, 250)) {
      setError("File quá lớn, tối đa 250KB");
      return;
    }

    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    if (nameError) setNameError(null);
  }

  function handleStartTracking() {
    if (!isValidName(name)) {
      setNameError("Tên phải có ít nhất 2 ký tự");
      return;
    }
    handleSetUser({ ...user, name, image: imageBase64 });
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
              error={nameError}
            />
            {nameError && (
              <p className="text-preset-7 text-red-600">* {nameError}</p>
            )}
          </Stack>
          <Stack direction="row" gap="250" className="items-center">
            <img
              src={imageBase64 || "/images/avatar-placeholder.svg"}
              className="w-[64px] h-[64px] shrink-0 rounded-full object-cover"
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
                {error && (
                  <p className="text-preset-7 text-red-600">* {error}</p>
                )}
              </Stack>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="w-fit text-neutral-600 text-preset-6 px-200 py-100 rounded-8 border border-neutral-300 hover:bg-neutral-100 transition-colors"
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
