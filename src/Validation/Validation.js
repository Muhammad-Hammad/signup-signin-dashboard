import * as yup from "yup";

export const SignupSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^\S/, "First Name should not contain Whitespace")
    .required("This field is required."),
  lastName: yup
    .string()
    .matches(/^\S/, "Last Name should not contain Whitespace")
    .required("This field is required."),
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});
export const SigninSchema = yup.object({
  email: yup.string().email().required("This field is required."),
  password: yup.string().required("This field is required."),
});
