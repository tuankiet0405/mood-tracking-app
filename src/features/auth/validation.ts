
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string,
): { valid: boolean; message: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Mật khẩu phải có ít nhất 6 ký tự" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ hoa" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Mật khẩu phải có ít nhất 1 số" };
  }
  return { valid: true, message: "" };
};
  
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const isValidFileSize = (file: File, maxSizeKB: number = 250): boolean => {
  return file.size <= maxSizeKB * 1024;
};

export const validateEmail = (email: string): { valid: boolean; message: string } => {
  if (!email.trim()) {
    return { valid: false, message: "Vui lòng nhập email" };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: "Email không hợp lệ" };
  }
  return { valid: true, message: "" };
};
