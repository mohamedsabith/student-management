import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";

import { signInUserApi } from "../../api/index";

const theme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const Navigate = useNavigate();

  const handleSubmit = async (event, values) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await signInUserApi(values);
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
            Login Successfully
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: { xs: 8, md: 15, lg: 20 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {error}
            </Typography>
          )}

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Email must be valid")
                .required("Email must be required")
                .max(255),
              password: Yup.string()
                .required("Password must be required")
                .max(255)
                .min(8),
            })}
          >
            {({ handleChange, values, errors, touched, handleBlur }) => (
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e, values)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
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
                <TextField
                  margin="normal"
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Boolean(
                    errors.password ||
                      values.password === "" ||
                      errors.email ||
                      values.email === ""
                  )}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
