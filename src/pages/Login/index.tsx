// @ts-nocheck
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import LoginImage from "@assets/images/login-side.png";
import logo from "@assets/images/iaps-logo.png";
import { useNavigate } from "react-router-dom";
import {
  StyledBox,
  StyledBoxInside,
  StyledButton,
  StyledInputField,
  StyledTextField,
  StyledTypography,
} from "./style";
import { login } from "@services/Accounts/api";
import CircularProgress from "@mui/material/CircularProgress";
import { setUser } from "../../userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    login(values)
      .then((response) => {
        const result = response.data;

        if (result.success) {
          const user = result.dataResult;
          dispatch(setUser(user));
          localStorage.setItem("authToken", result.dataResult.token);
          navigate("/dashboard");
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <Box
      style={{
        backgroundColor: "#641C36",
        width: "100%",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Box
        sx={{
          padding: "15px 0px 0px 0px",
          maxWidth: "100%",
          margin: "0px 20px",
        }}
      >
        <Grid container sx={{ mt: 3 }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <img src={LoginImage} width="100%" height={540} alt="" />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{ transform: "translate(-18px, 9px)" }}
          >
            <StyledBox>
              <StyledBoxInside>
                <img
                  src={logo}
                  width={100}
                  height={44}
                  alt=""
                  style={{ marginTop: "40px" }}
                />
                <StyledTypography variant="h4">
                  Hello, Welcome back!
                </StyledTypography>
              </StyledBoxInside>
              <form onSubmit={formik.handleSubmit}>
                <StyledInputField>
                  <br />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", color: "#333", fontWeight: "600" }}
                  >
                    Email
                  </Typography>
                  <StyledTextField
                    type="email"
                    name="email"
                    fullWidth
                    placeholder=" Enter your email"
                    id="fullWidth"
                    sx={{ height: "45px" }}
                    inputProps={{
                      style: { caretColor: "#2A85FF" },
                    }}
                    {...formik.getFieldProps("email")}
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={1}
                    sx={{ color: "#f44336" }}
                  >
                    {formik.touched.email && formik.errors.email && (
                      <Typography variant="body2" component="span">
                        {formik.errors.email}
                      </Typography>
                    )}
                  </Box>
                </StyledInputField>

                <StyledInputField mt={3}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "14px",
                      color: "#333",
                      fontWeight: "600",
                      marginTop: "13px",
                    }}
                  >
                    Password
                  </Typography>
                  <StyledTextField
                    type="password"
                    name="password"
                    fullWidth
                    placeholder=" Enter your password"
                    id="fullWidth"
                    inputProps={{
                      style: { caretColor: "#2A85FF" },
                    }}
                    {...formik.getFieldProps("password")}
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={1}
                    sx={{ color: "#f44336" }}
                  >
                    {formik.touched.password && formik.errors.password && (
                      <Typography variant="body2" component="span">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </Box>
                </StyledInputField>
                <br />
                <StyledButton
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </StyledButton>
                {loginError && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={2}
                    sx={{
                      fontSize: "14px",
                      color: "#333",
                      fontWeight: "600",
                    }}
                  >
                    <Typography variant="body2" color="error">
                      Wrong Credentials
                    </Typography>
                  </Box>
                )}
              </form>
            </StyledBox>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
