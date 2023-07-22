// @ts-nocheck
import { makeStyles } from "@mui/styles";
import {
  styled,
  TextField,
  TextareaAutosize,
  Button,
  Box,
} from "@mui/material";

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

export const StyledButton = styled(Button)(() => ({
  borderRadius: "26px",
  background: "#C64B68",
  width: "200px",
  padding: "8px 24px 8px 20px",
  height: "44px",
  color: "#FFF",
  "&:hover": {
    background: "#C64B68",
  },
  margin: "auto",
  display: "inline",
  maxWidth: "368px",
  "& .MuiInputBase-input": {
    padding: "13.5px 14px",
  },
}));

export const StyledInputField = styled(Box)(() => ({
  color: "black",
  maxWidth: "458px",
  "& .MuiInputBase-input": {
    padding: "13.5px 14px",
    "&:focus": {
      borderRadius: "5px",
      border: "2px solid #CCC",
      background: "#F2F2F2",
    },
  },
}));

export const StyledTextarea = styled(TextareaAutosize)(() => ({
  borderRadius: "6px",
  background: "#FFFFFF",
  border: "1px solid #CCC",
  "&:focus": {
    borderRadius: "5px",
    border: "2px solid #CCC",
    background: "#F2F2F2",
  },
  "&::placeholder": {
    fontSize: "13px",
    color: "#AAA",
    fontFamily: "Poppins",
    fontWeight: 500,
    letterSpacing: "-0.12px",
  },
}));

export default makeStyles((theme) => ({
  main: {
    backgroundColor: "#fff",
    maxWidth: "604px",
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
  title2: {
    color: "#333",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "-0.14px",
  },
  article: {
    display: "flex",
    justifyContent: "space-between",
  },
  uploadImage: {
    width: "490px",
    height: "143.631px",
    borderRadius: "5px",
    background: "#F2F2F2",
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
  },
  imageHeight: {
    width: "53px",
    height: "50px",
    borderRadius: "50px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
