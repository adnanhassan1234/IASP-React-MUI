// @ts-nocheck
import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  CssBaseline,
  Container,
  ButtonGroup,
  Typography,
  CircularProgress,
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
import { StyledSearch, StyledIcon } from "./style";
import { sectorHeadingData } from "@utils/tableHeadings.ts";
import { getAllSectors } from "@services/Sectors/api";
import { ISector } from "@interfaces/ISector";

const ListSector = (): JSX.Element => {
  const [tableData, setTableData] = useState<ISector[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTableContent, setFilteredTableContent] = useState<ISector[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const navigate = useNavigate();

  const handleCancelDelete = (): void => {
    // Close the confirmation popup
    setShowDeleteConfirmation(false);
  };
  const handleDelete = (id: string): void => {
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
    if (searchTerm === "") {
      setFilteredTableContent(tableData);
    } else {
      filterTableContent(searchTerm);
    }
  }, [searchTerm, tableData]);

  useEffect(() => {
    setLoading(true);
    getAllSectors()
      .then((response) => {
        const projectData: ISector[] = response.data;
        const newData: ISector[] = projectData.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          slug: item.slug,
        }));
        setTableData(newData);
        setFilteredTableContent(newData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term: string = event.target.value;
    setSearchTerm(term);
    filterTableContent(term);
  };

  const filterTableContent = (term: string) => {
    const filteredData: any = tableData.filter(
      (item) =>
        item?.name.toLowerCase().includes(term.toLowerCase()) ||
        item?.description.toLowerCase().includes(term.toLowerCase()) ||
        item?.slug.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  const handleEdit = (id: string) => {
    navigate(`/sectors/${id}`);
  };

  const handleConfirmDelete = (id: string) => {};

  return (
    <Box sx={{ mb: 5 }}>
      <Header title="Sectors" />
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
                  InputProps={{ startAdornment: <StyledIcon /> }}
                  onChange={handleSearchChange}
                  value={searchTerm}
                />
              </Box>
              {/* Button */}
              <Link to="/sectors/new">
                <AddButton title="Add New Sector" />
              </Link>
            </ButtonGroup>

            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#FFF4F7;",
                fontWeight: 600,
                paddingLeft: "18px",
                // width: "800px",
                color: "#641C36",
                margin: "20px",
                marginTop: "55px",
                textAlign: "left",
              }}
            >
              Published Sector
            </Typography>
            {/* table */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <CircularProgress />
              </Box>
            ) : filteredTableContent.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                No records are found!
              </Typography>
            ) : (
              <CommonTable
                path="/sectors"
                onEdit={handleEdit}
                onDelete={handleDelete}
                tableContent={filteredTableContent}
                tableHeadingData={sectorHeadingData}
              />
            )}
          </Container>
          <Dialog open={showDeleteConfirmation} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this item?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete}>Cancel</Button>
              <Button onClick={handleDelete} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </center>
    </Box>
  );
};

export default ListSector;
