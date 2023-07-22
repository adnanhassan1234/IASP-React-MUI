import * as React from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import axios from "axios";
import { useEffect } from "react";
// import userData from './userData,js';



export default function Employee(props) {
  var classes = useStyles();
  const [cardContent, setCardContent] = useState([]);
  console.log("🚀 ~ file: Employee.js:19 ~ Employee ~ cardContent:", cardContent)
  const [filteredTableContent, setFilteredTableContent] = useState([]);
  const [ProductCategories, setProductCategories] = useState([]);
  const [ProductTypes, setProductTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3005/users");
      // const response = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2023-06-15&sortBy=publishedAt&apiKey=027d887f86f44359ab77b4b2af8042f6");
      const data = response.data;
      const productCategories = [...new Set(data.map((option) => option.category))];
      const productTypes = [...new Set(data.map((option) => option.type))];
      setCardContent(data);
      setProductCategories(productCategories);
      setProductTypes(productTypes);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);


  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (name === "categories") {
      const filteredData = cardContent.filter((item) => {
        return item.category === value;
      });
        setFilteredTableContent(filteredData);
    }
    if (name === "productType") {
      const filteredData = cardContent.filter((item) => {
        return item.type === value;
      });
        setFilteredTableContent(filteredData);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterTableContent(event.target.value);
  };

  const filterTableContent = (term) => {
    const filteredData = cardContent.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTableContent(filteredData);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTableContent(cardContent);
    }
  }, [searchTerm, cardContent]);


  if (!loading) {
    return (
      <Box>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }


  return (
    <>
      <Box className="employee">
        <Container>
          <Typography color="text.primary" variant="h5" my={2}>
            User List Data
          </Typography>
          <Grid container spacing={2} className={classes.box}></Grid>
        </Container>
      </Box>

      {/* ============== field and card section ================= */}
      <Box className="field_card">
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <FormControl fullWidth sx={{ backgroundColor: "#fff" }}>
                  <InputLabel id="category">
                    Filter by category
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="category"
                    label="Selects Designation"
                    id="designation-selects"
                    name="categories"
                    onChange={handleChanges}
                    // value={searchTermByTitle}
                    // onChange={(e) => setSearchTermByTitle(e.target.value)}
                  >
                    {ProductCategories?.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <FormControl fullWidth sx={{ backgroundColor: "#fff" }}>
                  <InputLabel id="type">Filter by type</InputLabel>
                  <Select
                    fullWidth
                    labelId="type"
                    label="Select Designation"
                    id="designation-select"
                    name="productType"
                    onChange={handleChanges}
                    // value={searchTermByTitle}
                    // onChange={(e) => setSearchTermByTitle(e.target.value)}
                  >
                      {ProductTypes?.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <TextField
                  fullWidth
                  type="date"
                  // placeholder="Employee Name"
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff", height: "50px" }}
                  defaultValue="Normal"
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box mt={3}>
                <TextField
                  fullWidth
                  type="search"
                  placeholder="Search..."
                  id="fullWidth"
                  sx={{ backgroundColor: "#fff", height: "50px" }}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="employee_card" sx={{ my: 5, pb: 4 }}>
        <Container>
          <Grid container spacing={3}>
            {filteredTableContent?.map((content, ind) => {
              return (
                <EmployeeCard key={ind} {...content} fetchData={fetchData} />
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
