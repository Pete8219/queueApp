export const validatePassword = (password, againPassword) => {
  const errors = [];

  if (password !== againPassword) {
    errors.push("Пароли не совпадают");
  }

  if (password.length < 8) {
    errors.push("Пароль должен быть менее 8 символов");
  }

  if (
    !password.match(/[A-Z]/) ||
    !password.match(/[a-z]/) ||
    !password.match(/[0-9]/)
  ) {
    errors.push("Пароль должен содержать хотя бы одну заглавную букву и цифру");
  }

  return errors;
};
