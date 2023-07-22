// @ts-nocheck
import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ButtonGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "@components/Table";
import AddButton from "@components/AddButton";
import Header from "@components/Topbar/Header";
import { StyledIcon, StyledSearch } from "./style";
import { getAllReports, deleteReport } from "@services/Reports/api";
import { reportHeadingData } from "@utils/tableHeadings";
import { ApiResponse } from "src/types/ApiResponse";
import { IReport } from "@interfaces/IReport";
import { getAllSectors } from "@services/Sectors/api";
import { getAllRegions } from "@services/Regions/api";
import MuiAlert from "@mui/material/Alert";

interface ReportData {
  id: string;
  title: string;
  expertize: string;
  sectors: string | "N/A";
  regions: string | "N/A";
  year: number;
}

const ReportsList = () => {
  const [tableData, setTableData] = useState<ReportData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
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

  const [filteredTableContent, setFilteredTableContent] = useState<
    ReportData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTableContent(tableData);
    }
  }, [searchTerm, tableData]);

  useEffect(() => {
    setLoading(true);
    getAllReports()
      .then((response: ApiResponse<IReport[]>) => {
        const reportsData: IReport[] = response.data;
        const newData: ReportData[] = reportsData.map((item) => ({
          id: item.id,
          title: item.title,
          expertize: item.expertize,
          sectors: item.sectors[0]?.name || "N/A",
          regions: item.regions[0]?.name ? item.regions[0]?.name : "N/A",
          year: item.year,
        }));
        setTableData(newData);
        setFilteredTableContent(newData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    getAllSectors().then((response) => {
      setSectors(response.data);
    });
    getAllRegions().then((response) => {
      setRegions(response.data);
    });
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterTableContent(event.target.value);
  };

  const handleEdit = (id: string) => {
    navigate(`/reports/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteReport({ id })
      .then((response) => {
        let newData = filteredTableContent.filter((item) => {
          return item.id !== id;
        });
        setFilteredTableContent(newData);
        setIsSnackbarOpen(true);
        setShowDeleteConfirmation(false);
        setSnackbarMessage("Report deleted successfully!");
      })
      .catch((error) => {
        setIsSnackbarOpen(true);
        setSnackbarMessage("An error occurred. Please try again later.");
        setError(error);
      });
  };

  const filterTableContent = (term: string) => {
    const filteredData = tableData.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.expertize.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "sectors") {
      const filteredData = tableData.filter((item) => {
        return item.sectors === value;
      });
      setFilteredTableContent(filteredData);
    }
    if (name === "regions") {
      const filteredData = tableData.filter((item) => {
        return item.regions === value;
      });
      setFilteredTableContent(filteredData);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Header title="Reports" />
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
                <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ color: "#999999" }}
                  >
                    Filter by Sector
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Age"
                    name="sectors"
                    onChange={handleChange}
                    sx={{ borderRadius: "35px", textAlign: "left" }}
                  >
                    {sectors.map((option: any) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
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
                    name="regions"
                    onChange={handleChange}
                    sx={{ borderRadius: "35px", textAlign: "left" }}
                  >
                    {regions.map((option: any) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ color: "#999999" }}
                  >
                    Filter by Year
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Age"
                    sx={{ borderRadius: "35px", textAlign: "left" }}
                  >
                    {[].map((option: any) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Link to="/reports/new">
                <AddButton title="Add New Report" />
              </Link>
            </ButtonGroup>
            <Box sx={{ textAlign: "left" }}>
              <StyledSearch
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{ startAdornment: <StyledIcon /> }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#FFF4F7;",
                fontWeight: 600,
                paddingLeft: "18px",
                color: "#641C36",
                margin: "10px",
                marginTop: "33px",
                textAlign: "left",
              }}
            >
              Published Reports
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
                path="/reports"
                tableContent={filteredTableContent}
                tableHeadingData={reportHeadingData}
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
                {snackbarMessage}
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

export default ReportsList;
