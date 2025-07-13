import { RegisterFormValues } from "@/types/register";

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
>;

export const validateRegisterForm = (
  values: RegisterFormValues
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  if (!values.firstname || values.firstname.length < 2) {
    errors.firstname = "Firstname must be at least 2 characters";
  }

  if (!values.lastname || values.lastname.length < 2) {
    errors.lastname = "Lastname must be at least 2 characters";
  }

  if (!values.username || values.username.length < 2) {
    errors.username = "Username must be at least 2 characters";
  }

  if (!values.email || !values.email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
