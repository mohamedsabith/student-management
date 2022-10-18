import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";
import { countries } from "./Countries";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StudentAddForm() {
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [religion, setReligion] = useState("");
  const [dob, setDob] = useState(null);
  const [country, setCountry] = useState("");

  const handleSubmit = (event, values) => {
    event.preventDefault();
    const studentDetails = {
      ...values,
      gender,
      category,
      religion,
      dob,
      country,
    };
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Snackbar
        open={success}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={1000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Application submitted Successfully
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 900 }}>
            APPLICATION FORM
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              fatherName: "",
              motherName: "",
              fatherOccupation: "",
              motherOccupation: "",
              email: "",
              phoneNumber: "",
              address: "",
              city: "",
              pincode: "",
              state: "",
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .required("First Name is required")
                .max(255),
              lastName: Yup.string().required("Last Name is required").max(255),
              fatherName: Yup.string()
                .required("Father Name is required")
                .max(255),
              motherName: Yup.string()
                .required("Mother Name is required")
                .max(255),
              fatherOccupation: Yup.string()
                .required("Father Occupation is required")
                .max(255),
              motherOccupation: Yup.string()
                .required("Mother Occupation is required")
                .max(255),
              city: Yup.string().required("City is required").max(255),
              state: Yup.string().required("State is required").max(255),
              address: Yup.string()
                .required("Address must be required")
                .max(255),
              pincode: Yup.number("Pincode must be number").required(
                "Pincode is required"
              ),
              email: Yup.string()
                .email("Email must be valid")
                .required("Email is required")
                .max(255),
              phoneNumber: Yup.number("Phone Number must be number").required(
                "Phone Number is required"
              ),
            })}
          >
            {({ handleChange, values, errors, touched, handleBlur }) => (
              <Box
                component="form"
                onSubmit={(e) => {
                  handleSubmit(e, values);
                }}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      type="text"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      required
                      fullWidth
                      id="Email"
                      type="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      label="Phone Number"
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-select-helper-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="gender-select-helper-label"
                        id="gender-select-helper"
                        label="Age"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker
                        disableFuture
                        label="Date Of Birth"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={dob}
                        onChange={(newValue) => {
                          setDob(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="DD-MM-YYYY"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.fatherName && errors.fatherName)}
                      helperText={touched.fatherName && errors.fatherName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fatherName}
                      required
                      fullWidth
                      id="fatherName"
                      label="Father Name"
                      name="fatherName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.motherName && errors.motherName)}
                      helperText={touched.motherName && errors.motherName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.motherName}
                      required
                      fullWidth
                      id="motherName"
                      label="Mother Name"
                      name="motherName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(
                        touched.fatherOccupation && errors.fatherOccupation
                      )}
                      helperText={
                        touched.fatherOccupation && errors.fatherOccupation
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fatherOccupation}
                      type="text"
                      required
                      fullWidth
                      id="fatherOccupation"
                      label="Father Occupation"
                      name="fatherOccupation"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(
                        touched.motherOccupation && errors.motherOccupation
                      )}
                      helperText={
                        touched.motherOccupation && errors.motherOccupation
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.motherOccupation}
                      required
                      fullWidth
                      id="motherOccupation"
                      label="Mother Occupation"
                      name="motherOccupation"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="category-select-helper-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="category-select-helper-label"
                        id="category-select-helper"
                        label="Category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                      >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="OBC">OBC</MenuItem>
                        <MenuItem value="SC">SC</MenuItem>
                        <MenuItem value="ST">ST</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="religion-select-helper-label">
                        Religion
                      </InputLabel>
                      <Select
                        labelId="religion-select-helper-label"
                        id="religion-select-helper"
                        label="Religion"
                        value={religion}
                        onChange={(event) => setReligion(event.target.value)}
                      >
                        <MenuItem value="Muslim">Muslim</MenuItem>
                        <MenuItem value="Hindu">Hindu</MenuItem>
                        <MenuItem value="Sikh">Sikh</MenuItem>
                        <MenuItem value="Christian">Christian</MenuItem>
                        <MenuItem value="Jain">Jain</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      id="country-select-demo"
                      fullWidth
                      options={countries}
                      autoHighlight
                      onChange={(e, value) => setCountry(value.label)}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state}
                      required
                      fullWidth
                      id="State"
                      label="State"
                      name="state"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      required
                      fullWidth
                      id="City"
                      label="City"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.pincode && errors.pincode)}
                      helperText={touched.pincode && errors.pincode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pincode}
                      required
                      fullWidth
                      id="Pincode"
                      type="number"
                      label="Pincode"
                      name="pincode"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Boolean(
                    errors.firstName ||
                      values.firstName === "" ||
                      errors.lastName ||
                      values.lastName === "" ||
                      errors.email ||
                      values.email === "" ||
                      errors.phoneNumber ||
                      values.phoneNumber === "" ||
                      errors.fatherName ||
                      values.fatherName === "" ||
                      errors.motherName ||
                      values.motherName === "" ||
                      errors.fatherOccupation ||
                      values.fatherOccupation === "" ||
                      errors.motherOccupation ||
                      values.motherOccupation === "" ||
                      errors.address ||
                      values.address === "" ||
                      errors.city ||
                      values.city === "" ||
                      errors.state ||
                      values.state === "" ||
                      errors.pincode ||
                      values.pincode === "" ||
                      country === "" ||
                      gender === "" ||
                      category === "" ||
                      religion === "" ||
                      dob === null
                  )}
                >
                  SUBMIT
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
