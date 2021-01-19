import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { SignupSchema } from "../Validation/Validation";

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signupUser } from "../redux/actions";

// let SignupSchema = yup.object({
//   firstName: yup.string().required("This field is required."),
//   lastName: yup.string().required("This field is required."),
//   email: yup.string().email().required("This field is required."),
//   password: yup
//     .string()
//     .min(6, "Password is too short.")
//     .max(20, "Password is too long.")
//     .required("This field is required."),
// });
// const regex = /[^A-Za-z]/gi;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: "red",
    fontFamily: "monospace",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  // const [firstName, setfirstName] = useState("");
  // const [lastName, setlastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const state = useSelector((state) => state.auth);
  const handleSubmit = (e, { resetForm, setSubmitting }) => {
    // dispatch(signupUser(e.firstName, e.lastName, e.email, e.password));
    dispatch(signupUser(e.firstName, e.lastName, e.email, e.password));
    resetForm({
      values: {
        firstName: "",
        email: "",
        password: "",
        lastName: "",
      },
    });

    // e.preventDefault();
    // dispatch(signupUser(firstName, lastName, email, password));
    // setfirstName("");
    // setlastName("");
    // e.target.reset();
  };
  const { isAuthenticated, signUpError, signUpErrorMsg } = state;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, touched, isValid, dirty }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errors.firstName && touched.firstName}
                      autoComplete="firstName"
                      name="firstName"
                      variant="outlined"
                      value={values.firstName}
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      helperText={
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : null
                      }
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errors.lastName && touched.lastName}
                      variant="outlined"
                      required
                      value={values.lastName}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lastName"
                      helperText={
                        errors.lastName && touched.lastName
                          ? errors.lastName
                          : null
                      }
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.email && touched.email}
                      variant="outlined"
                      required
                      value={values.email}
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      helperText={
                        errors.email && touched.email ? errors.email : null
                      }
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.password && touched.password}
                      variant="outlined"
                      value={values.password}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : null
                      }
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {signUpErrorMsg && (
                  <Typography component="p" className={classes.errorText}>
                    {signUpError}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!dirty}
                  // onClick={handleReset}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}
// onChange={(e) => {
//   let value = e.target.value;
//   value = value.replaceAll(regex, "");
//   setfirstName(value);
// }}
