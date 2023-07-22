import { styled, Box, Button, Typography, TextField } from "@mui/material";
export const StyledBox = styled(Box)(() => ({
  backgroundColor: "white",
  height: "518px",
  borderRadius: "0px 60px 60px 0px",
  transform: "translate(0px, 0px)",
}));

export const StyledButton = styled(Button)(() => ({
  borderRadius: "26px",
  background: "#C64B68",
  width: "189px",
  padding: "8px 24px 8px 20px",
  height: "44px",
  color: "#FFF",
  "&:hover": {
    background: "#C64B68",
  },
  margin: "auto",
  display: "block",
  maxWidth: "368px",
  "& .MuiInputBase-input": {
    padding: "13.5px 14px",
  },
}));

export const StyledBoxInside = styled(Box)(() => ({
  margin: "auto",
  display: "block",
  textAlign: "center",
  color: "black",
  padding: "9px",

  // backgroundColor: '#aaa',
}));
export const StyledInputField = styled(Box)(() => ({
  margin: "auto",
  display: "block",
  color: "black",
  padding: "9px",
  maxWidth: "368px",
  "& .MuiInputBase-input": {
    padding: "13.5px 14px",
    "&:focus": {
      borderRadius: "5px",
      border: "2px solid #CCC",
      background: "#F2F2F2",
    },
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  color: "#641C36",
  fontSize: "43px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "600",
  letterSpacing: "-0.48px",
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    border: "1px solid #CCC",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#CCC",
      border: "none",
    },
  },
}));
