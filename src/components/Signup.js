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
import Loader from "./loader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signupUser } from "../redux/actions";

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
    width: "100%",
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

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Student",
  };
  const state = useSelector((state) => state.auth);
  const handleSubmit = (e, { resetForm }) => {
    setLoading(true);

    dispatch(signupUser(e.firstName, e.lastName, e.email, e.password, e.role));
    resetForm({
      values: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      },
    });
  };
  let { signup, login } = state;
  if (signup.error && loading) {
    setLoading(false);
  }

  if (signup.success || login.success) {
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
                      error={
                        Boolean(errors.firstName) && Boolean(touched.firstName)
                      }
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
                      onFocus={() => {
                        signup.errorMsg = "";
                        touched.firstName = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={
                        Boolean(errors.lastName) && Boolean(touched.lastName)
                      }
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
                      onFocus={() => {
                        signup.errorMsg = "";
                        touched.lastName = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(errors.email) && Boolean(touched.email)}
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
                      onFocus={() => {
                        signup.errorMsg = "";
                        touched.email = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
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
                      onFocus={() => {
                        signup.errorMsg = "";
                        touched.password = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {signup.error && (
                  <Typography component="p" className={classes.errorText}>
                    {signup.errorMsg}
                  </Typography>
                )}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Role</FormLabel>
                  <RadioGroup
                    aria-label="role"
                    name="role"
                    required
                    value={values.role}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Student"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="Company"
                      control={<Radio />}
                      label="Company"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!dirty}
                >
                  {!loading ? "Sign Up" : <Loader />}
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
