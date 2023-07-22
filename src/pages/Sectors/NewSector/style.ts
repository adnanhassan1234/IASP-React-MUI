import { makeStyles } from "@mui/styles";
import { TextField, Box } from "@mui/material";
import { styled } from "@mui/system";

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
    "& ::placeholder": {
      fontSize: "14px",
      fontFamily: "Poppins",
      // color: '#999999 !important',
      fontWeight: 500,
      letterSpacing: "-0.12px",
    },
  },
}));

export const StyledInputField = styled(Box)(() => ({
  color: "black",
  maxWidth: "100%",
  "& .MuiInputBase-input": {
    padding: "13.5px 14px",
    "&:focus": {
      borderRadius: "5px",
      border: "2px solid #CCC",
      background: "#F2F2F2",
    },
  },
}));

const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: "#fff",
    maxWidth: "490px",
    padding: "44px",
    borderRadius: "14px",
    border: "1px solid #E8E8E8",
    margin: "39px 40px 0px 177px",
    boxShadow: "0px 4px 12px 0px rgba(129, 129, 129, 0.25)",
  },
  title: {
    color: "#641C36",
    fontSize: "23px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "47px",
    letterSpacing: "-0.28px",
  },
  label: {
    fontSize: "15px",
    color: "#333",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  article: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  btns: {
    borderRadius: "26px !important",
    background: "#C64B68 !important",
    boxShadow: "0px 3px 5px 0px rgba(128, 128, 128, 0.35)",
    width: "178.33px !important",
    padding: "8px 24px 8px 20px",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    marginTop: "60px !important",
    gap: "8px",
    textTransform: "capitalize",
    "&:hover": {
      background: "#C64B68",
    },
  },
}));

export default useStyles;
