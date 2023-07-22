import { useState, useEffect } from "react";
import avator from "@assets/icons/Avatar.svg";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Snackbar,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "@components/Topbar/Header.js";
import { StyledInputField, StyledTextField } from "./style";
import useStyles from "./style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllDomains } from "@services/Domains/api";
import { registerAdmin } from "@services/Accounts/api";
import MuiAlert from "@mui/material/Alert";

interface Domain {
  id: string;
  name: string;
}

interface FormValues {
  fullName: string;
  email: string;
  domainId: string;
}

const AddAdmin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    getAllDomains().then((response: any) => {
      setDomains(response.data);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    domainId: Yup.string().required("Domain is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      domainId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      // @ts-ignore
      registerAdmin(values)
        .then(() => {
          setIsSnackbarOpen(true);
          formik.resetForm();
          setTimeout(() => {
            navigate("/admins");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error while adding admin:", error);
        });
    },
  });

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <Header title="Admin" />
      <center>
        <Box style={{ marginTop: "10px", marginBottom: "66px" }}>
          <Container>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Box className={classes.main}>
                  <Box className={classes.article}>
                    <Typography variant="h4">
                      {params.id ? (
                        <span className={classes.title}>Edit Admin</span>
                      ) : (
                        <span className={classes.title}>Register Admin</span>
                      )}
                    </Typography>
                    <Link to="/reports">
                      <img src={avator} alt="" width={45} />
                    </Link>
                  </Box>

                  <form onSubmit={formik.handleSubmit}>
                    <StyledInputField>
                      <br />
                      <Typography
                        variant="h6"
                        className={classes.label}
                        sx={{ textAlign: "left" }}
                      >
                        <span className={classes.label}>Full Name</span>
                      </Typography>
                      <StyledTextField
                        type="text"
                        fullWidth
                        name="fullName"
                        placeholder="Enter your full name"
                        id="fullWidth"
                        sx={{ height: "45px" }}
                        inputProps={{
                          style: { caretColor: "#2A85FF" },
                        }}
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.fullName &&
                          Boolean(formik.errors.fullName)
                        }
                        helperText={
                          formik.touched.fullName && formik.errors.fullName
                        }
                      />
                    </StyledInputField>
                    <StyledInputField>
                      <br />
                      <Typography variant="h6" sx={{ textAlign: "left" }}>
                        <span className={classes.label}>Email</span>
                      </Typography>
                      <StyledTextField
                        type="email"
                        fullWidth
                        name="email"
                        placeholder="Enter your email"
                        id="fullWidth"
                        sx={{ height: "45px" }}
                        inputProps={{
                          style: { caretColor: "#2A85FF" },
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </StyledInputField>

                    <StyledInputField>
                      <br />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          color: "#333",
                          fontWeight: "600",
                          marginTop: "0px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp; <span className={classes.label}>Domains</span>
                      </Typography>

                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ color: "#999999" }}
                        >
                          Select a domain...
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="Domain"
                          name="domainId"
                          value={formik.values.domainId}
                          onChange={formik.handleChange}
                          sx={{ borderRadius: "35px", textAlign: "left" }}
                          error={
                            formik.touched.domainId &&
                            Boolean(formik.errors.domainId)
                          }
                          // @ts-ignore
                          helperText={
                            formik.touched.domainId && formik.errors.domainId
                          }
                        >
                          {domains.map((option: any) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </StyledInputField>

                    <StyledInputField>
                      &nbsp;
                      {params.id ? (
                        <Button
                          sx={{ textTransform: "capitalize" }}
                          variant="contained"
                          className={classes.btns}
                          type="submit"
                        >
                          Update Admin
                        </Button>
                      ) : (
                        <Button
                          sx={{ textTransform: "capitalize" }}
                          variant="contained"
                          className={classes.btns}
                          type="submit"
                          disabled={!formik.isValid}
                        >
                          Add Admin
                        </Button>
                      )}
                    </StyledInputField>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </center>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Admin created successfully.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AddAdmin;
