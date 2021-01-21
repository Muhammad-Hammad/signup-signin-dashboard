import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "./loader";
import { Form, Formik } from "formik";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { SigninSchema } from "../Validation/Validation";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: "red",
  },
}));

function Login() {
  // let [newEmail, setEmail] = useState("");
  // let [newPassword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let initialValues = {
    email: "",
    password: "",
  };
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);
    dispatch(loginUser(values.email, values.password));
    resetForm({
      values: {
        email: "",
        password: "",
      },
    });
  };

  const { login, signup } = state;
  const classes = useStyles();
  if (login.error && loading) {
    setLoading(false);
  }
  if (login.success || signup.success) {
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
            Sign In
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, touched, isValid, dirty }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
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
                        login.error = false;
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
                        login.error = false;
                        touched.password = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {login.error && !values.email && (
                  <Typography component="p" className={classes.errorText}>
                    Incorrect email or password.
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!dirty}
                >
                  {!loading ? "Sign in" : <Loader />}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item xs>
                    <Link href="/forgotPassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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

//   if (isAuthenticated) {
//     return <Redirect to="/" />;
//   } else {
//     return (
//       <div>
//         <Container component="main" maxWidth="xs">
//           <Paper className={classes.paper}>
//             <Avatar className={classes.avatar}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {loginError && (
//               <Typography component="p" className={classes.errorText}>
//                 Incorrect email or password.
//               </Typography>
//             )}
//             {/* <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           /> */}
//             <Button
//               type="button"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//               onClick={handleSubmit}
//             >
//               Sign In
//             </Button>
//             <br />
//             <Grid container justify="flex-end">
//               {/* <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid> */}

// <Grid item>
//   <Link href="signup" variant="body2">
//     {"Don't have an account? Sign Up"}
//   </Link>
// </Grid>
//             </Grid>
//           </Paper>
//         </Container>
//       </div>
//     );
//   }
// }
// function mapStateToProps(state) {
//     return {
//       isLoggingIn: state.auth.isLoggingIn,
//       loginError: state.auth.loginError,
//       isAuthenticated: state.auth.isAuthenticated
//     };
//   }

export default Login;
