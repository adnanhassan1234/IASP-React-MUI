// @ts-nocheck
import { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

import {
  Snackbar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useStyles from "./style.ts";
import avator from "@assets/icons/Avatar.svg";
import upload from "@assets/images/Group 15.png";
import publish from "@assets/icons/publish.svg";
import view from "@assets/icons/view.svg";

import Header from "@components/Topbar/Header.tsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledInputField,
  StyledTextField,
  StyledTextarea,
} from "./style.ts";
import { getAllCountries } from "@services/Countries/api.ts";
import { getAllSectors } from "@services/Sectors/api.ts";
import { getAllDomains } from "@services/Domains/api.ts";
import {
  getProjectById,
  addProject,
  updateProject,
} from "@services/Projects/api.ts";

const AddProject = () => {
  const classes = useStyles();
  const params = useParams();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [data, setData] = useState({});
  const [files, setFiles] = useState([]);
  // @ts-ignore
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    getAllCountries().then((response: any) => {
      setCountries(response.data);
    });
    getAllSectors().then((response) => {
      setSectors(response.data);
    });
    getProjectById(params?.id).then((response) => {
      setData(response.data);
    });
    getAllDomains().then((response) => {
      setDomains(response.data);
    });
  }, []);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "countries" || name === "sectors") {
      const selectedItem =
        name === "countries"
          ? countries.filter((item) => item.name == value)
          : sectors.filter((item) => item.name === value);
      setData((prevData) => ({ ...prevData, [name]: selectedItem[0].id }));
    } else if (name === "images") {
      setFiles(files[0]);
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const publishProject = () => {
    if (params.id) {
      let formData = new FormData();
      formData.append("id", data?.id);
      formData.append("Title", data?.title);
      formData.append("Body", data?.body);
      formData.append("ExistingImageIds", data?.images[0].id);
      formData.append("imageFiles", data?.images[0].url);
      formData.append("Domains", data?.domains[0].id);
      // formData.append("Sectors");
      updateProject(formData).then(() => {
        setSnackbarMessage("Project updated successfully!");
        setIsSnackbarOpen(true);
        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      });
    } else {
      let formData = new FormData();
      formData.append("Title", data.title);
      formData.append("Body", data?.body);
      formData.append("ImageFiles", files);
      formData.append("Domains", "d598e974-d7ed-4994-a2dd-2e3fdf410c2e");
      formData.append("Sectors", data?.sectors);
      addProject(formData).then(() => {
        setSnackbarMessage("Project added successfully!");
        setIsSnackbarOpen(true);
        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      });
    }
  };

  return (
    <>
      <Header title="Projects" />
      <center>
        <Box style={{ marginTop: "10px", marginBottom: "66px" }}>
          <Container>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Box className={classes.main}>
                  <Box className={classes.article}>
                    <Typography variant="h4">
                      {params.id ? (
                        <span className={classes.title}>Edit Project</span>
                      ) : (
                        <span className={classes.title}>Add Project</span>
                      )}
                    </Typography>
                    <Link to="/projects">
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
                      value={data?.title}
                      onChange={handleChange}
                      type="text"
                      name="title"
                      fullWidth
                      placeholder=" Enter a title"
                      id="fullWidth"
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
                      <span className={classes.title2}>Body</span>
                    </Typography>

                    <StyledTextarea
                      name="body"
                      // @ts-ignore
                      onChange={handleChange}
                      minRows={8}
                      placeholder="Enter article body..."
                      // @ts-ignore
                      value={data?.body}
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
                        marginTop: "10px",
                      }}
                    >
                      <span className={classes.title2}>
                        &nbsp;&nbsp; Country
                      </span>
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 455 }} size="small">
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ color: "#999999" }}
                      >
                        Select a Country...
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        name="countries"
                        onChange={handleChange}
                        id="demo-select-small"
                        label="Age"
                        sx={{ borderRadius: "35px", textAlign: "left" }}
                      >
                        {countries.map((option: any) => (
                          <MenuItem key={option?.id} value={option?.name}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledInputField>
                  {/* Sectors */}
                  <StyledInputField>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                    >
                      <span className={classes.title2}>
                        &nbsp;&nbsp; Services
                      </span>
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 455 }} size="small">
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ color: "#999999" }}
                      >
                        Select a Service...
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="sectors"
                        // @ts-ignore
                        value={data?.sectors}
                        // @ts-ignore
                        onChange={handleChange}
                        // label="Age"
                        sx={{ borderRadius: "35px", textAlign: "left" }}
                      >
                        {sectors.map((option: any) => (
                          <MenuItem key={option?.id} value={option?.name}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledInputField>
                  <StyledInputField>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "left",
                        fontWeight: "600",
                        marginTop: "15px",
                      }}
                    >
                      <span className={classes.title2}> Picture</span>
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      className={classes.uploadImage}
                      sx={{ justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        component="label"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "none",
                          backgroundColor: "transparent",
                          color: "#999",
                          textTransform: "capitalize",
                        }}
                      >
                        <Box className={classes.imageHeight}>
                          <img src={upload} alt="" />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "14px",
                            color: "#999",
                            fontWeight: "600",
                            marginTop: "15px",
                            textAlign: "center",
                          }}
                        >
                          Upload your images here
                        </Typography>
                        <input
                          hidden
                          accept="image/*"
                          name="images"
                          onChange={handleChange}
                          multiple
                          type="file"
                        />
                      </Button>
                    </Stack>{" "}
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
                        &nbsp; Preview Project
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        onClick={publishProject}
                        sx={{ textTransform: "none" }}
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
                        {params.id ? (
                          <> Update Project </>
                        ) : (
                          <> Publish Project </>
                        )}
                      </StyledButton>
                    </Box>
                  </StyledInputField>
                </Box>
              </Grid>
            </Grid>
          </Container>
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
              severity="success"
            >
              {params.id
                ? "Project updated successfully!"
                : "Project added successfully!"}
            </MuiAlert>
          </Snackbar>
        </Box>
      </center>
    </>
  );
};

export default AddProject;
