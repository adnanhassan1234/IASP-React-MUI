import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  selected: {
    backgroundColor: "#C64B68 !important",
    marginLeft: "18px !important",
    maxWidth: "303px",
    borderRadius: "12px !important",
  },
  listItemButton: {
    marginLeft: "18px !important",
    maxWidth: "303px",
    borderRadius: "12px",
  },
  listItemIcon: {
    minWidth: "31px !important",
  },
  listIcon: {
    color: "white",
    width: "100%",
    position: "relative",
    marginLeft: "2px !important",
  },
  leftIcon: {
    position: "absolute",
    right: "-14px",
    height: "33px !important",
    width: "33px !important",
    backgroundColor: "#641C36",
    transform: "rotate(0deg)",
    border: "1px solid #853753",
    color: "white",
  },
}));
