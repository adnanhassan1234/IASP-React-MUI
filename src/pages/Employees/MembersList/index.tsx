import { useState, useEffect } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ButtonGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "@components/Table";
import AddButton from "@components/AddButton";
import Header from "@components/Topbar/Header";
import { StyledIcon, StyledSearch } from "./style";
import { getAllMembers, deleteMember } from "@services/Members/api";
import { memberHeadingData } from "@utils/tableHeadings";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import { ApiResponse } from "src/types/ApiResponse";
import { IMember } from "@interfaces/IMember";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface MemberData {
  id: string;
  fullName: string;
  position: string;
}

const MembersList = () => {
  const [tableData, setTableData] = useState<MemberData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTableContent, setFilteredTableContent] = useState<
    MemberData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
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

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllMembers()
      .then((response: ApiResponse<IMember[]>) => {
        // @ts-ignore
        const membersData: IMember[] = response.data;
        const newData: MemberData[] = membersData.map((item) => ({
          id: item.id,
          fullName: item.fullName,
          position: item.position,
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
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term: string = event.target.value;
    setSearchTerm(term);
    filterTableContent(term);
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const handleDelete = (id: string) => {
    const delObj = { id };
    deleteMember(delObj)
      .then(() => {
        let newData = filteredTableContent.filter((item) => {
          return item.id !== id;
        });
        setFilteredTableContent(newData);
        setIsSnackbarOpen(true);
        setShowDeleteConfirmation(false);
        setSnackbarMessage("Member deleted successfully!");
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
        item.fullName.toLowerCase().includes(term.toLowerCase()) ||
        item.position.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Header title="Team" />
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
                <StyledSearch
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{ startAdornment: <StyledIcon /> }}
                />
              </Box>
              <Link to="/employees/new">
                <AddButton title="Add New Member" />
              </Link>
            </ButtonGroup>

            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#FFF4F7;",
                fontWeight: 600,
                paddingLeft: "18px",
                color: "#641C36",
                margin: "20px",
                marginTop: "55px",
                textAlign: "left",
              }}
            >
              Team
            </Typography>

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : filteredTableContent.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                No records are found!
              </Typography>
            ) : (
              <CommonTable
                path="/employees"
                tableContent={filteredTableContent}
                tableHeadingData={memberHeadingData}
                // @ts-ignore
                onEdit={handleEdit}
                // @ts-ignore
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

export default MembersList;
