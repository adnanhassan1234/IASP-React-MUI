import Items from "./Items";
import LogoImage from "@assets/images/iaps-logo.png";
import { Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        // display: "none",
        backgroundColor: "#641c36",
        color: "whitesmoke",
        minWidth: 353,
        maxWidth: 353,
        position: "fixed",
        left: 0,
        height: "100vh",
        minHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      <img
        src={LogoImage}
        alt="logo"
        style={{
          margin: "40px 0 0 20px",
          backgroundColor: "#FFF",
          borderRadius: "6px",
        }}
      />
      <Items />
    </Box>
  );
};

export default Sidebar;
