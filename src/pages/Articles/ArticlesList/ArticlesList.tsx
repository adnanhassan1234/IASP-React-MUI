// @ts-nocheck
import { useState, useEffect } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "@components/Table";
import AddButton from "@components/AddButton";
import Header from "@components/Topbar/Header";
import { StyledIcon, StyledSearch } from "./style";
import { getAllArticles, deleteArticle } from "@services/Articles/api";
import { articleHeadingData } from "@utils/tableHeadings";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import { ApiResponse } from "src/types/ApiResponse";
import { IArticle } from "@interfaces/IArticle";

interface ArticleData {
  id: string;
  title: string;
  countries: string | "N/A";
  createdBy: string;
  createdDate: string;
}

const ArticlesList = () => {
  const [tableData, setTableData] = useState<ArticleData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTableContent, setFilteredTableContent] = useState<
    ArticleData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

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
    }
  }, [searchTerm, tableData]);

  useEffect(() => {
    setLoading(true);
    getAllArticles()
      .then((response: ApiResponse<IArticle[]>) => {
        const articleData: IArticle[] = response.data;
        const newData: ArticleData[] = articleData.map((item) => ({
          id: item.id,
          title: item.title,
          countries: item.countries[0] || "N/A",
          createdBy: item.createdBy,
          createdDate: new Date(item.createdDate).toLocaleDateString(),
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
    navigate(`/articles/${id}`);
  };

  const handleDelete = (id: string) => {
    const delObj = { id };
    deleteArticle(delObj)
      .then((response) => {
        let newData = filteredTableContent.filter((item) => {
          return item.id !== id;
        });
        setFilteredTableContent(newData);
        setIsSnackbarOpen(true);
        setShowDeleteConfirmation(false);
        setSnackbarMessage("Article deleted successfully!");
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
        item.createdBy.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Header title="Articles" />
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
              <Link to="/articles/new">
                <AddButton title="Add New Article" />
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
              Published Articles
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
                path="/articles"
                tableContent={filteredTableContent}
                tableHeadingData={articleHeadingData}
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

export default ArticlesList;
