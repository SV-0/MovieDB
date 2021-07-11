import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { registerUser } from "../../actions/user_actions";
import Input from "./Input";
import useStyles from "./styles";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  return (
    <Formik
      initialValues={{
        email: "",
        lastname: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
        return (
          <div>
            <Container component="main" maxWidth="xs">
              <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{"Sign Up"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Input name="name" label="First Name" half value={values.name} handleBlur={handleBlur} handleChange={handleChange} type="text" />
                    {errors.name && touched.name && <div style={{ color: "#ff0000bf", fontSize: "1rem", padding: "0.3rem" }}>{errors.name}</div>}
                    <Input name="lastname" label="First Name" half value={values.lastname} handleBlur={handleBlur} handleChange={handleChange} type="text" />
                    {errors.lastname && touched.lastname && <div style={{ color: "#ff0000bf", fontSize: "1rem", padding: "0.3rem" }}>{errors.lastname}</div>}
                    <Input name="email" label="Email Address" value={values.email} handleBlur={handleBlur} handleChange={handleChange} type="email" />
                    {errors.email && touched.email && <div style={{ color: "#ff0000bf", fontSize: "1rem", padding: "0.3rem" }}>{errors.email}</div>}
                    <Input
                      name="password"
                      label="Password"
                      value={values.password}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      handleShowPassword={handleShowPassword}
                    />
                    {errors.password && touched.password && <div style={{ color: "#ff0000bf", fontSize: "1rem", padding: "0.3rem" }}>{errors.password}</div>}
                    <Input name="confirmPassword" label="Confirm Password" value={values.confirmPassword} handleBlur={handleBlur} handleChange={handleChange} type="password" />
                    {errors.password && touched.password && <div style={{ color: "#ff0000bf", fontSize: "1rem", padding: "0.3rem" }}>{errors.password}</div>}
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit} className={classes.submit}>
                    {"Sign Up"}
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button component={Link} to="/login">
                        Already have an account? Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Container>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
