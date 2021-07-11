import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";

import { loginUser } from "../../actions/user_actions";
import Input from "./Input";
import useStyles from "./styles";

function LoginPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };
          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                props.history.push("/");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
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
                <Typography variant="h5">{"Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
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
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting} className={classes.submit}>
                    {"Sign In"}
                  </Button>
                  {formErrorMessage && (
                    <label>
                      <p style={{ color: "#ff0000bf", fontSize: "1rem", padding: "0.3rem" }}>{formErrorMessage}</p>
                    </label>
                  )}
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button component={Link} to="/register">
                        Don't have an account? Sign Up
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

export default LoginPage;
