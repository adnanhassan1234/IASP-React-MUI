// @ts-nocheck
import { useState, useEffect } from "react";
import {
  Snackbar,
  Box,
  Button,
  Container,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
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
import { Link, useParams } from "react-router-dom";
import {
  StyledButton,
  StyledInputField,
  StyledTextField,
  StyledTextarea,
  StyledTypography,
} from "./style.ts";
import { getAllDomains } from "@services/Domains/api.ts";
import { getAllRegions } from "@services/Regions/api.ts";
import { getAllSectors } from "@services/Sectors/api.ts";
import { addReport, getReportById } from "@services/Reports/api.ts";

const AddReports = () => {
  const classes = useStyles();
  const params = useParams();
  const [data, setData] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [domains, setDomains] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleChange = (event) => {
    let { name, value, files } = event.target;
    if (name === "pdfFile") {
      setData((prev) => {
        return { ...prev, [name]: files[0] };
      });
    } else {
      setData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const submitForm = (values, e: any) => {
    console.log("in submit", values);
    const formData = new FormData();
    formData.append("Title", data?.title);
    formData.append("Expertize", data?.expertize);
    formData.append("Year", data?.year);
    formData.append("Domains", data?.domain);
    formData.append("Sectors", data?.sector);
    formData.append("Regions", data?.region);
    formData.append("PdfFile", values.pdfFile);
    addReport(formData).then((response) => {
      // toggleModal(); // Open the success modal
      setIsSnackbarOpen(true);
      setSnackbarMessage(
        params.id
          ? "Reports updated successfully!"
          : "Reports added successfully!"
      );
      setTimeout(() => {
        navigate("/reports");
      }, 2000);
    });
  };

  useEffect(() => {
    Promise.all([
      getAllDomains(),
      getAllRegions(),
      getAllSectors(),
      getReportById(params?.id),
    ])
      .then(
        ([
          domainsResponse,
          regionsResponse,
          sectorsResponse,
          reportResponse,
        ]) => {
          setDomains(domainsResponse.data);
          setRegions(regionsResponse.data);
          setSectors(sectorsResponse.data);
          setData(reportResponse.data);
        }
      )
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header title="Reports" />
      <center>
        <Box style={{ marginTop: "30px", marginBottom: "66px" }}>
          <Container>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Box className={classes.main}>
                  <Box className={classes.article}>
                    <Typography variant="h4">
                      {params.id ? (
                        <span className={classes.title}> Edit Report</span>
                      ) : (
                        <span className={classes.title}> Add Report</span>
                      )}
                    </Typography>
                    <Link to="/reports">
                      <img src={avator} alt="" width={45} />
                    </Link>
                  </Box>

                  <form onSubmit={submitForm}>
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
                        name="title"
                        value={data?.title}
                        onChange={handleChange}
                        id="title"
                        sx={{ height: "45px" }}
                        inputProps={{
                          style: { caretColor: "#2A85FF" },
                        }}
                      />
                    </StyledInputField>

                    <StyledInputField>
                      <StyledTypography variant="h6" sx={{ textAlign: "left" }}>
                        <span className={classes.title2}>Expertise</span>
                      </StyledTypography>

                      <StyledTextarea
                        minRows={8}
                        sx={{
                          width: "100%",
                          padding: "13.5px 14px",
                          "&:focus": {
                            borderRadius: "5px",
                            border: "2px solid #CCC",
                            background: "#F2F2F2",
                          },
                        }}
                        placeholder="Enter article expertize..."
                        name="expertize"
                        value={data?.expertize}
                        onChange={handleChange}
                      />
                    </StyledInputField>
                    <StyledInputField>
                      <Typography variant="h6" sx={{ textAlign: "left" }}>
                        <span className={classes.title2}>Year</span>
                      </Typography>
                      <StyledTextField
                        type="text"
                        fullWidth
                        placeholder=" Enter a year"
                        name="year"
                        value={data?.year}
                        onChange={handleChange}
                        id="year"
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
                          marginTop: "17px",
                        }}
                      >
                        <span className={classes.title2}>
                          &nbsp;&nbsp; Domains
                        </span>
                      </Typography>

                      <FormControl sx={{ m: 1, minWidth: 455 }} size="small">
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ color: "#999999" }}
                        >
                          Select a domains
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          name="domain"
                          onChange={handleChange}
                          label="Age"
                          sx={{ borderRadius: "35px", textAlign: "left" }}
                        >
                          {domains.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </StyledInputField>

                    <Grid container spacing={2}>
                      <Grid item lg={6}>
                        <StyledInputField>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#333",
                              textAlign: "left",
                              fontWeight: "600",
                              marginTop: "17px",
                            }}
                          >
                            <span className={classes.title2}>
                              &nbsp;&nbsp;&nbsp; Sectors
                            </span>
                          </Typography>

                          <FormControl
                            sx={{ m: 1, minWidth: 200 }}
                            size="small"
                          >
                            <InputLabel
                              id="demo-select-small-label"
                              sx={{ color: "#999999" }}
                            >
                              Select a sector
                            </InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              name="sector"
                              onChange={handleChange}
                              label="Age"
                              sx={{ borderRadius: "35px", textAlign: "left" }}
                            >
                              {sectors.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </StyledInputField>
                      </Grid>
                      <Grid item lg={6}>
                        <StyledInputField>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#333",
                              textAlign: "left",
                              fontWeight: "600",
                              marginTop: "17px",
                            }}
                          >
                            <span className={classes.title2}>
                              &nbsp;&nbsp;&nbsp; Regions
                            </span>
                          </Typography>

                          <FormControl
                            sx={{ m: 1, minWidth: 200 }}
                            size="small"
                          >
                            <InputLabel
                              id="demo-select-small-label"
                              sx={{ color: "#999999" }}
                            >
                              Select a region
                            </InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              name="region"
                              onChange={handleChange}
                              label="Age"
                              sx={{ borderRadius: "35px", textAlign: "left" }}
                            >
                              {regions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </StyledInputField>
                      </Grid>
                    </Grid>

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
                        <span className={classes.title2}> Pdf file</span>
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
                            Upload your pdf file here
                          </Typography>
                          <input
                            hidden
                            accept="application/pdf"
                            name="pdfFile"
                            onChange={handleChange}
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
                          type="submit"
                        >
                          <img
                            style={{ transform: "translate(5px, 4px)" }}
                            src={view}
                            alt="preview"
                          />{" "}
                          &nbsp; Preview Report
                        </StyledButton>

                        <StyledButton
                          variant="contained"
                          sx={{ textTransform: "none" }}
                          onClick={submitForm}
                          type="submit"
                        >
                          <img
                            style={{
                              transform: "translate(5px, 4px)",
                              height: "21px",
                            }}
                            src={publish}
                            alt="preview"
                          />
                          &nbsp;{" "}
                          {params.id ? (
                            <> Update Report </>
                          ) : (
                            <> Publish Report </>
                          )}
                        </StyledButton>
                      </Box>
                    </StyledInputField>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </center>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4">Report Added Successfully!</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AddReports;
