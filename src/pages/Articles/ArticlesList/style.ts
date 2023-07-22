import { styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const StyledSearch = styled(TextField)(() => ({
  display: "flex",
  verticalAlign: "baseline",
  borderRadius: "26px",
  width: "205px",
  marginLeft: "15px",
  border: "none",
  "& .MuiInputBase-root": {
    textAlign: "center",
    borderRadius: "26px",
    height: "45px",
    "& input": {
      textAlign: "left",
    },
  },
}));

export const StyledIcon = styled(SearchIcon)(() => ({
  // transform: "translate(-44px, 2px)",
  margin: "10px",
  color: " #999",
  fontSize: "22px",
}));
