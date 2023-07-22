// @ts-nocheck
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
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
  Snackbar,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useStyles from "./style.ts";
import avator from "@assets/icons/Avatar.svg";
import upload from "@assets/images/Group 15.png";
import publish from "@assets/icons/publish.svg";
import view from "@assets/icons/view.svg";
import Header from "@components/Topbar/Header.tsx";
import { getAllCountries } from "@services/Countries/api.ts";
import {
  addArticle,
  getArticleById,
  updateArticle,
} from "@services/Articles/api.ts";
import {
  StyledButton,
  StyledInputField,
  StyledTextField,
  StyledTextarea,
} from "./style.ts";

const AddArticle = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState({});
  const [files, setFiles] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllCountries()
      .then((response) => {
        setCountries(response.data);
        return getArticleById(params?.id);
      })
      .then((response) => {
        setData(response.data.dataResult);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "countries") {
      return;
    }
    if (name === "image") {
      setFiles(files[0]);
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (params.id) {
      let formData = new FormData();
      formData.append("id", data?.id);
      formData.append("Title", data?.title);
      formData.append("Body", data?.body);
      formData.append("ExistingImageIds", data?.images[0].id);
      formData.append("imageFiles", data?.images[0].url);
      formData.append("Domains", data?.domains[0].id);
      updateArticle(formData).then((response) => {
        setIsSnackbarOpen(true);
        setTimeout(() => {
          navigate("/articles");
        }, 2000);
      });
    } else {
      let formData = new FormData();
      formData.append("Title", data.title);
      formData.append("Body", data?.body);
      formData.append("ImageFiles", files);
      formData.append("Domains", "d598e974-d7ed-4994-a2dd-2e3fdf410c2e");
      addArticle(formData).then((response) => {
        setIsSnackbarOpen(true);
        setTimeout(() => {
          navigate("/articles");
        }, 2000);
      });
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Header title="Articles" />
      <center>
        <Box style={{ marginTop: "30px", marginBottom: "66px" }}>
          <Container>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Box className={classes.main}>
                  <Box className={classes.article}>
                    <Typography variant="h4">
                      {params.id ? (
                        <span className={classes.title}> Edit Article</span>
                      ) : (
                        <span className={classes.title}> New Article</span>
                      )}
                    </Typography>
                    <Link to="/articles">
                      <img src={avator} alt="" width={45} />
                    </Link>
                  </Box>

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
                        ? "Article updated successfully!"
                        : "Article added successfully!"}
                    </MuiAlert>
                  </Snackbar>

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
                      value={data?.title}
                      name="title"
                      onChange={handleChange}
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
                      minRows={8}
                      placeholder="Enter article body..."
                      name="body"
                      onChange={handleChange}
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
                        marginTop: "12px",
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
                        Select a country
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="countries"
                        onChange={handleChange}
                        label="Age"
                        sx={{ borderRadius: "35px", textAlign: "left" }}
                      >
                        {countries.map((option: any) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
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
                        marginTop: "10px",
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
                          name="image"
                          onChange={handleChange}
                          hidden
                          accept="image/*"
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
                        &nbsp; Preview Article
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        onClick={handleSubmit}
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
                          <> Update Article </>
                        ) : (
                          <> Publish Article </>
                        )}
                      </StyledButton>
                    </Box>
                  </StyledInputField>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </center>
    </>
  );
};

export default AddArticle;
