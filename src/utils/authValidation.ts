export const emailValidation = (emailValue: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(emailValue.trim());
};

export const passwordValidation = (passwordValue: string): boolean => {
  return passwordValue.trim().length < 8 ? false : true;
};
