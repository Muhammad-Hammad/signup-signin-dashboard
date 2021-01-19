// import React from "react";
// // import './Form.sass'
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import { Formik, Form } from "formik";
// import * as yup from "yup";

// // import FormControlLabel from '@material-ui/core/FormControlLabel';
// // import Checkbox from '@material-ui/core/Checkbox';
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";

// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import { signupUser } from "../redux/actions";

// class Form extends React.Component {
//   render() {
//     return (
//       <section className="form-style">
//         <h2>Example Clear Inputs with Formik</h2>
//         <Formik
//           initialValues={{
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: "",
//           }}
//           validationSchema={Yup.object({
//             FirstName: Yup.string(),
//             FirstNumber: Yup.string().email(),
//           })}
//           onSubmit={(values, { resetForm }) => {
//             console.log(values);
//             resetForm({ values: "" });
//           }}
//         >
//           {(formik) => (
//             <form onSubmit={formik.handleSubmit}>
//               <label htmlFor="FirstName">Name</label>
//               <input
//                 type="text"
//                 id="FirstName"
//                 onChange={formik.handleChange}
//                 value={formik.values.FirstName}
//               ></input>
//               <label htmlFor="FirstNumber">Number</label>
//               <input
//                 type="email"
//                 id="FirstNumber"
//                 onChange={formik.handleChange}
//                 value={formik.values.FirstNumber}
//               ></input>
//               <input type="submit" value="Send"></input>
//             </form>
//           )}
//         </Formik>
//       </section>
//     );
//   }
// }

// export default Form;
