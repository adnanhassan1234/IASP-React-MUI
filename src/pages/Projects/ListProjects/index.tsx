// @ts-nocheck
import { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import CommonTable from "@components/Table";
import AddButton from "@components/AddButton";
import Header from "@components/Topbar/Header";
import { StyledIcon, StyledSearch } from "./style";
import { getAllProjects } from "@services/Projects/api";
import { projectHeadingData } from "@utils/tableHeadings";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "@services/Projects/api";
import { getAllSectors } from "@services/Sectors/api";
import { getAllRegions } from "@services/Regions/api";
import MuiAlert from "@mui/material/Alert";

const Projects = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectors, setSectors] = useState([]);
  const [filteredTableContent, setFilteredTableContent] = useState(tableData);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const handleCancelDelete = (): void => {
    // Close the confirmation popup
    setShowDeleteConfirmation(false);
  };
  const handleConfirmDelete = (id: string): void => {
    // Set the ID of the item to be deleted
    setDeleteItemId(id);
    // Show the confirmation popup
    setShowDeleteConfirmation(true);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTableContent(tableData);
    } else {
      filterTableContent(searchTerm);
    }
  }, [searchTerm, tableData]);

  useEffect(() => {
    setLoading(true);
    getAllProjects()
      .then((response) => {
        const projectData = response.data;
        const newData = projectData.map((item) => ({
          id: item.id,
          title: item.title,
          countries: item.countries[0] || "N/A",
          body: item.body,
          createdBy: item.createdBy,
          createdDate: new Date(item.createdDate).toLocaleDateString(),
        }));
        setTableData(newData);
        setFilteredTableContent(newData);
        getAllSectors().then((response) => {
          setSectors(response.data);
        });
        getAllRegions().then((response) => {
          setRegions(response.data);
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterTableContent(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleDelete = (id: any) => {
    deleteProject({ id })
      .then((response) => {
        let newData = filteredTableContent.filter((item) => {
          return item.id !== id;
        });
        setFilteredTableContent(newData);
        setTableData(newData);
        setIsSnackbarOpen(true);
        setShowDeleteConfirmation(false);

        setSnackbarMessage("Project deleted successfully!");
      })
      .catch((error) => {
        setIsSnackbarOpen(true);
        setSnackbarMessage("An error occurred. Please try again later.");
        setError(error);
      });
  };

  const filterTableContent = (term) => {
    const filteredData = tableData.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.body.toLowerCase().includes(term.toLowerCase()) ||
        item.createdBy.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Header title="Projects" />
      <center>
        <Box
          sx={{
            padding: "8px",
            bgcolor: "#FFFFFF",
            borderRadius: "30px",
            maxWidth: "95%",
            margin: "39px 40px 0px 155px",
            pb: 5,
          }}
        >
          <CssBaseline />
          <Container>
            <ButtonGroup
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "2px",
              }}
            >
              <Box sx={{ mt: 2 }}>
                <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ color: "#999999" }}
                  >
                    Filter by sector
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name="sector"
                    onChange={handleChange}
                    label="Age"
                    sx={{ borderRadius: "35px", textAlign: "left" }}
                  >
                    {sectors.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ color: "#999999" }}
                  >
                    Filter by region
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Age"
                    name="region"
                    onChange={handleChange}
                    sx={{ borderRadius: "35px", textAlign: "left" }}
                  >
                    {regions.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ mt: 1 }} size="small">
                  <StyledSearch
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{ startAdornment: <StyledIcon /> }}
                  />
                </FormControl>
              </Box>
              <Link to="/projects/new">
                <AddButton title="Add New Project" />
              </Link>
            </ButtonGroup>

            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#FFF4F7;",
                fontWeight: 600,
                paddingLeft: "18px",
                // width: "810px",
                color: "#641C36",
                margin: "20px",
                textAlign: "left",
              }}
            >
              Published Projects
            </Typography>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredTableContent.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                No records are found!
              </Typography>
            ) : (
              <CommonTable
                path="/projects"
                tableContent={filteredTableContent}
                tableHeadingData={projectHeadingData}
                onEdit={handleEdit}
                onDelete={handleConfirmDelete}
              />
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
          </Container>
          <Dialog open={showDeleteConfirmation} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this item?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete}>Cancel</Button>
              <Button
                onClick={() => handleDelete(deleteItemId)}
                color="error"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </center>
    </Box>
  );
};

export default Projects;
