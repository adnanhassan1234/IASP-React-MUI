import { Box } from "@mui/material";
import { IBoxComponentProps } from "@interfaces/IBoxComponentProps";

const BoxComponent: React.FC<IBoxComponentProps> = ({
  width,
  height,
  children,
}) => {
  return (
    <Box
      width={width}
      height={height}
      sx={{ margin: "40px auto", backgroundColor: "#FFF" }}
    >
      {children}
    </Box>
  );
};

export default BoxComponent;
