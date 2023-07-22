import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  CssBaseline,
  Container,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "@components/Table";
import AddButton from "@components/AddButton";
import Header from "@components/Topbar/Header";
import { StyledSearch, StyledIcon } from "./style";
import { adminHeadingData } from "@utils/tableHeadings";
import { tableData } from "@utils/tableData";

interface TableItem {
  id: string;
  title: string;
  country: string;
  body: string;
}

const LastAdmins = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTableContent, setFilteredTableContent] =
    useState<TableItem[]>(tableData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTableContent(tableData);
    }
  }, [searchTerm]);

  const handleEdit = (id: string): any => {
    navigate(`/admins/${id}`);
  };

  const handleDelete = (id: string): any => {
    let newData = filteredTableContent.filter((item) => {
      return item.id !== id;
    });
    setFilteredTableContent(newData);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterTableContent(term);
  };

  const filterTableContent = (term: string) => {
    const filteredData = tableData.filter(
      (item: any) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.country.toLowerCase().includes(term.toLowerCase()) ||
        item.body.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Header title="Admin" />
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
              <Link to="/admins/new">
                <AddButton title="Add New Admin" />
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
              Published Admins
            </Typography>

            {filteredTableContent.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                No records are found!
              </Typography>
            ) : (
              <CommonTable
                path="/admins"
                tableContent={filteredTableContent}
                tableHeadingData={adminHeadingData}
                // @ts-ignore
                onEdit={handleEdit}
                // @ts-ignore
                onDelete={handleDelete}
              />
            )}
          </Container>
        </Box>
      </center>
    </Box>
  );
};

export default LastAdmins;
