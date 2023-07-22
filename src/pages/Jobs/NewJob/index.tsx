// @ts-nocheck
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useStyles from "./style.ts";
import avator from "@assets/icons/Avatar.svg";
import publish from "@assets/icons/publish.svg";
import view from "@assets/icons/view.svg";
import Header from "@components/Topbar/Header.tsx";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  StyledButton,
  StyledInputField,
  StyledTextField,
  StyledTextarea,
} from "./style.ts";
import { useEffect, useState } from "react";
import { addJob, updateJob } from "../../../services/Jobs/api.ts";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { getAllDomains } from "../../../services/Domains/api.ts";
import { useNavigate } from "react-router-dom";
const AddJobs = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [domainData, setDomainData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    workingHours: "",
    description: "",
    responsibilities: [{ title: "" }],
    qualifications: [{ title: "" }],
    howToApply: "",
    domainId: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleResponsibilityChange = (index: any, event: any) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      const responsibilities = [...prevValue.responsibilities];
      responsibilities[index] = { ...responsibilities[index], [name]: value };
      return { ...prevValue, responsibilities };
    });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleQualificationChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      const qualifications = [...prevValue.qualifications];
      qualifications[index] = { ...qualifications[index], [name]: value };
      return { ...prevValue, qualifications };
    });
  };

  const publishJob = () => {
    if (params.id) {
      updateJob(formData.responsibilities);
      setIsSnackbarOpen(true);
      setTimeout(() => {
        navigate("/jobs");
      }, 2000);
    } else {
      const updatedFormData = {
        ...formData,
        domains: [formData.domainId],
      };
      addJob(updatedFormData).then((response) => {
        setIsSnackbarOpen(true);
        setTimeout(() => {
          navigate("/jobs");
        }, 2000);
      });
    }
  };

  useEffect(() => {
    getAllDomains().then((response: any) => {
      setDomainData(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Jobs" />
      <center>
        <Box style={{ marginTop: "10px", marginBottom: "66px" }}>
          <Container>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Box className={classes.main}>
                  <Box className={classes.article}>
                    <Typography variant="h4">
                      <span className={classes.title}>
                        {" "}
                        {params.id ? <>Edit Job</> : <>Add Job</>}{" "}
                      </span>
                    </Typography>
                    <Link to="/jobs">
                      <img src={avator} alt="" width={45} />
                    </Link>
                  </Box>

                  <StyledInputField>
                    <br />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      <span className={classes.title2}>Title</span>
                    </Typography>
                    <StyledTextField
                      type="text"
                      fullWidth
                      placeholder=" Enter a title"
                      id="fullWidth"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      sx={{ height: "45px" }}
                      inputProps={{
                        style: { caretColor: "#2A85FF" },
                      }}
                    />
                  </StyledInputField>
                  <StyledInputField>
                    <br />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      <span className={classes.title2}>Location</span>
                    </Typography>
                    <StyledTextField
                      type="text"
                      fullWidth
                      placeholder=" Enter a location"
                      id="fullWidth"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      sx={{ height: "45px" }}
                      inputProps={{
                        style: { caretColor: "#2A85FF" },
                      }}
                    />
                  </StyledInputField>

                  <StyledInputField>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                        marginTop: "26px",
                      }}
                    >
                      <span className={classes.title2}>Description</span>
                    </Typography>

                    <StyledTextarea
                      rows={8}
                      minRows={8}
                      placeholder="Enter article body..."
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      sx={{
                        width: "100%",
                        padding: "13.5px 14px",
                        "&:focus": {
                          borderRadius: "5px",
                          border: "2px solid #CCC",
                          background: "#F2F2F2",
                        },
                      }}
                    />
                  </StyledInputField>
                  <StyledInputField>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                        marginTop: "12px",
                      }}
                    >
                      <span className={classes.title2}>How to apply</span>
                    </Typography>
                    <StyledTextField
                      type="text"
                      fullWidth
                      placeholder=" Enter how to apply"
                      id="fullWidth"
                      name="howToApply"
                      value={formData.howToApply}
                      onChange={handleChange}
                      sx={{ height: "45px" }}
                      inputProps={{
                        style: { caretColor: "#2A85FF" },
                      }}
                    />
                  </StyledInputField>
                  <StyledInputField>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                        marginTop: "22px",
                      }}
                    >
                      <span className={classes.title2}>Working hours</span>
                    </Typography>
                    <StyledTextField
                      type="text"
                      fullWidth
                      placeholder=" Enter working hours"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleChange}
                      sx={{ height: "45px" }}
                      inputProps={{
                        style: { caretColor: "#2A85FF" },
                      }}
                    />
                  </StyledInputField>
                  {formData.responsibilities.map((responsibility, index) => (
                    <StyledInputField key={index}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          color: "#333",
                          textAlign: "left",
                          fontWeight: "600",
                          marginTop: "22px",
                        }}
                      >
                        <span className={classes.title2}>Responsibility</span>
                      </Typography>
                      <StyledTextField
                        type="text"
                        fullWidth
                        placeholder=" Enter a responsibility"
                        id="fullWidth"
                        name="title"
                        value={responsibility.title}
                        onChange={(event: any) =>
                          handleResponsibilityChange(index, event)
                        }
                        sx={{ height: "45px" }}
                        inputProps={{
                          style: { caretColor: "#2A85FF" },
                        }}
                      />
                    </StyledInputField>
                  ))}

                  {formData.qualifications.map((qualification, index) => (
                    <StyledInputField>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          color: "#333",
                          textAlign: "left",
                          fontWeight: "600",
                          marginTop: "22px",
                        }}
                      >
                        <span className={classes.title2}>Qualification</span>
                      </Typography>
                      <StyledTextField
                        type="text"
                        fullWidth
                        placeholder=" Enter a qualification"
                        id="fullWidth"
                        name="title"
                        value={qualification.title}
                        onChange={(event) =>
                          handleQualificationChange(index, event)
                        }
                        sx={{ height: "45px" }}
                        inputProps={{
                          style: { caretColor: "#2A85FF" },
                        }}
                      />
                    </StyledInputField>
                  ))}

                  <StyledInputField>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                        marginTop: "22px",
                      }}
                    >
                      <span className={classes.title2}>Domains</span>
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 455 }} size="small">
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ color: "#999999" }}
                      >
                        Select a domain
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Domain"
                        sx={{ borderRadius: "35px", textAlign: "left" }}
                        name="domainId"
                        value={formData.domainId}
                        onChange={handleChange}
                      >
                        {domainData.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledInputField>

                  <StyledInputField>
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "40px",
                      }}
                    >
                      <StyledButton
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#B9B9B9",
                        }}
                      >
                        <img
                          style={{ transform: "translate(5px, 4px)" }}
                          src={view}
                          alt="preview"
                        />{" "}
                        &nbsp; Preview Job
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        onClick={publishJob}
                      >
                        <img
                          style={{
                            transform: "translate(5px, 4px)",
                            height: "21px",
                          }}
                          src={publish}
                          alt="preview"
                        />{" "}
                        &nbsp;{" "}
                        {params.id ? <> Update Job </> : <> Publish Job </>}
                      </StyledButton>
                    </Box>
                  </StyledInputField>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
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
            Job added successfully
          </MuiAlert>
        </Snackbar>
      </center>
    </>
  );
};

export default AddJobs;
