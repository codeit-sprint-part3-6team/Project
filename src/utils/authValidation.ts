export const emailValidation = (emailValue: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(emailValue.trim());
};

export const passwordValidation = (passwordValue: string): boolean => {
  return passwordValue.trim().length < 8 ? false : true;
};

export const nicknameValidation = (nicknameValue: string): boolean => {
  return nicknameValue.trim().length > 10 || nicknameValue === ''
    ? true
    : false;
};

export const passwordCheckValidation = (
  passwordValue: string,
  passwordCheckValue: string,
): boolean => {
  return passwordValue === passwordCheckValue ? false : true;
};
