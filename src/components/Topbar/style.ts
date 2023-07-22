import { styled, AppBar, Typography, TextField, Box } from "@mui/material";
export const StyledAppBar = styled(AppBar)(() => ({
  position: "static",
  width: "100%",
  padding: "15px 35px",
  background: "#FCFCFC",
  boxShadow: "inset 1px 0px 0px #F4F4F4",
  zIndex: "inherit",
}));

export const StyledTitle = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "28px",
  lineHeight: "24px",
  color: "#641C36",
  marginLeft: "90px",
}));

export const StyledInputField = styled(TextField)(() => ({
  fontFamily: "Poppins",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "24px",
  letterSpacing: "-0.01em",
  color: "#9A9FA5",
  flex: "none",
  order: 1,
  flexGrow: 0,
  "& .css-nz481w-MuiInputBase-input-MuiInput-input": {
    marginLeft: "7px",
    "&:focus": {
      caretColor: "#2A85FF",
    },
  },
}));

export const StyledSearchBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "8px 42px 8px 8px",
  gap: "10px",
  background: "#F4F4F4",
  borderRadius: "12px",
  marginRight: "33px",
}));

export const StyledRightBlock = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0px",
  gap: "20px",
  width: "185px",
  height: "48px",
  flex: "none",
  order: 2,
  flexGrow: 0,
}));

export const StyledLedianShera = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "24px",
  textAlign: "right",
  letterSpacing: "-0.01em",
  color: "#641C36",
  marginRight: "0px",
}));

export const StyledAvatar = styled(Box)(() => ({
  boxSizing: "border-box",
  width: "48px",
  height: "48px",
  background: "#C64B68",
  border: "2px solid #641C36",
  borderRadius: "48px",
  flex: "none",
  order: 1,
  flexGrow: 0,
}));
