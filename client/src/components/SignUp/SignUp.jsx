import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "yup-phone";

import { signUpUserApi } from "../../api/index";

const theme = createTheme();

export default function SignUp() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async (event, values) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await signUpUserApi(values);
      if (data) {
        setSuccess(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setTimeout(() => {
          Navigate("/home");
        }, 1200);
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const phoneSchema = Yup.string()
    .phone("IN", true, "Please enter a valid phone number.")
    .required("Phone number must be required");

  return (
    <ThemeProvider theme={theme}>
      {loading && <LinearProgress />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
          open={success}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={1000}
          sx={{ mt: 7 }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Register Successfully
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: { xs: 8, md: 15, lg: 22 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Formik
            initialValues={{
              number: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
              number: phoneSchema,
              email: Yup.string()
                .email("Email must be valid")
                .required("Email must be required")
                .max(255),
              password: Yup.string()
                .required("Password must be required")
                .max(255)
                .min(8),
              confirmPassword: Yup.string()
                .oneOf(
                  [Yup.ref("password"), null],
                  "Your password and confirmation password do not match"
                )
                .required(
                  "Your password and confirmation password do not match"
                ),
            })}
          >
            {({ handleChange, values, errors, touched, handleBlur }) => (
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e, values)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.number && errors.number)}
                      helperText={touched.number && errors.number}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.number}
                      type="text"
                      required
                      fullWidth
                      id="number"
                      label="Phone Number"
                      name="number"
                      autoComplete="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      type="email"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      required
                      fullWidth
                      name="confirmPassword"
                      label="confirm Password"
                      type="password"
                      id="confirmPassword"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Boolean(
                    errors.password ||
                      values.password === "" ||
                      errors.email ||
                      values.email === "" ||
                      errors.number ||
                      values.number === "" ||
                      values.confirmPassword === "" ||
                      errors.confirmPassword
                  )}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
