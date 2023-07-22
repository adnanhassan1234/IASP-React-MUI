import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import Header from "@components/Topbar/Header.js";
import { StyledInputField, StyledTextField } from "./style.ts";
import useStyles from "./style.ts";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import avator from "@assets/icons/Avatar.svg";
import { getSectorById } from "@services/Sectors/api.ts";
import MuiAlert from "@mui/material/Alert";

const AddSector = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    sectorName: Yup.string().required("Sector Name is required"),
    description: Yup.string().required("Description is required"),
    slug: Yup.string().required("Sector Slug is required"),
  });

  const formik = useFormik({
    initialValues: {
      sectorName: "",
      description: "",
      slug: "",
    },
    validationSchema,
    onSubmit: () => {
      // Handle form submission
    },
  });

  useEffect(() => {
    setLoading(true);
    if (params.id) {
      getSectorById(params.id)
        .then((response: any) => {
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleFormSubmit = () => {
    // Handle form submission and API calls
    setIsSnackbarOpen(true);
    setSnackbarMessage(
      params.id ? "Sector updated successfully!" : "Sector added successfully!"
    );
    setTimeout(() => {
      navigate("/sectors");
    }, 2000);
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
                        <span className={classes.title}>Edit Sector</span>
                      ) : (
                        <span className={classes.title}>Add Sector</span>
                      )}
                    </Typography>
                    <Link to="/sectors">
                      <img src={avator} alt="" width={45} />
                    </Link>
                  </Box>
                  {loading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", my: 2 }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <form onSubmit={formik.handleSubmit}>
                      <StyledInputField>
                        <br />
                        <Typography
                          variant="h6"
                          className={classes.label}
                          sx={{ textAlign: "left" }}
                        >
                          <span className={classes.label}>Name</span>
                        </Typography>
                        <StyledTextField
                          type="text"
                          fullWidth
                          name="sectorName"
                          // @ts-ignore
                          value={data?.name}
                          onChange={formik.handleChange}
                          placeholder="Enter Sector Name"
                          id="sectorName"
                          sx={{ height: "45px" }}
                          inputProps={{
                            style: { caretColor: "#2A85FF" },
                          }}
                          // @ts-ignore
                          error={
                            formik.touched.sectorName &&
                            formik.errors.sectorName
                          }
                          helperText={
                            formik.touched.sectorName &&
                            formik.errors.sectorName
                          }
                        />
                      </StyledInputField>
                      {/* email */}
                      <StyledInputField>
                        <br />
                        <Typography variant="h6" sx={{ textAlign: "left" }}>
                          <span className={classes.label}>Description</span>
                        </Typography>
                        <StyledTextField
                          type="text"
                          fullWidth
                          name="description"
                          // @ts-ignore
                          value={data?.description}
                          onChange={formik.handleChange}
                          placeholder="Enter Sector Description"
                          id="description"
                          sx={{ height: "45px" }}
                          inputProps={{
                            style: { caretColor: "#2A85FF" },
                          }}
                          // @ts-ignore
                          error={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                        />
                      </StyledInputField>
                      <StyledInputField>
                        <br />
                        <Typography variant="h6" sx={{ textAlign: "left" }}>
                          <span className={classes.label}>Sector Slug</span>
                        </Typography>
                        <StyledTextField
                          type="text"
                          fullWidth
                          name="slug"
                          // @ts-ignore
                          value={data?.slug}
                          onChange={formik.handleChange}
                          placeholder="Enter Sector Slug"
                          id="slug"
                          sx={{ height: "45px" }}
                          inputProps={{
                            style: { caretColor: "#2A85FF" },
                          }}
                          // @ts-ignore
                          error={formik.touched.slug && formik.errors.slug}
                          helperText={formik.touched.slug && formik.errors.slug}
                        />
                      </StyledInputField>

                      <StyledInputField>
                        &nbsp;
                        {params.id ? (
                          <Button
                            sx={{ textTransform: "capitalize" }}
                            variant="contained"
                            className={classes.btns}
                            type="submit"
                            onClick={handleFormSubmit}
                          >
                            Update Sector
                          </Button>
                        ) : (
                          <Button
                            sx={{ textTransform: "capitalize" }}
                            variant="contained"
                            className={classes.btns}
                            type="submit"
                            onClick={handleFormSubmit}
                          >
                            Add Sector
                          </Button>
                        )}
                      </StyledInputField>
                    </form>
                  )}
                  <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MuiAlert
                      elevation={6}
                      variant="filled"
                      onClose={handleSnackbarClose}
                      severity={error ? "error" : "success"}
                    >
                      {error
                        ? "An error occurred. Please try again later."
                        : snackbarMessage}
                    </MuiAlert>
                  </Snackbar>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </center>
    </>
  );
};

export default AddSector;
