// 이메일과 패스워드 관련 검증 정규식
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!%*#?&])[a-zA-Z0-9!%*#?&]{8,}$/;
const PASSWORD_MIN_LENGTH = 8;

// 이메일 검증 (username)
export const validateEmail = (email: string): string | undefined => {

  if (!email || email.trim() === "") {
    return "이메일을 입력해주세요.";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "올바른 이메일 형식이 아닙니다.";
  }

  return undefined;
};

// 이름 검증 (name)
export const validateName = (name: string): string | undefined => {

  if (!name || name.trim() === "") {
    return "이름을 입력해주세요.";
  }

  return undefined;
};

// 비밀번호 검증 (password)
export const validatePassword = (password: string): string | undefined => {

  if (!password) {
    return "비밀번호를 입력해주세요.";
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;
  }

  if (!/[0-9]/.test(password)) {
    return "비밀번호는 숫자(0-9)를 포함해야 합니다.";
  }

  if (!/[a-zA-Z]/.test(password)) {
    return "비밀번호는 영문자(a-z, A-Z)를 포함해야 합니다.";
  }

  if (!/[!%*#?&]/.test(password)) {
    return "비밀번호는 특수문자(!%*#?&) 중 최소 1개를 포함해야 합니다.";
  }

  if (!PASSWORD_REGEX.test(password)) {
    return "비밀번호는 최소 8자 이상, 숫자, 영문자, 특수문자(!%*#?&)로만 구성되어야 합니다.";
  }

  return undefined;
};

// 비밀번호 확인 검증 (confirmPassword)
export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  
  if (!confirmPassword) {
    return "비밀번호 확인을 입력해주세요.";
  }

  if (password !== confirmPassword) {
    return "비밀번호와 일치하지 않습니다.";
  }

  return undefined;
};