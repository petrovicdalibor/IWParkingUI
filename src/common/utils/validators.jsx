export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (
    !new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    ).test(password)
  ) {
    return "Password must have a minimum 6 characters, one uppercase letter one special character and one number";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum of 6 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};
