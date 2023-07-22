import AddIcon from "@mui/icons-material/Add";
import { StyledButton } from "./style";
import { IAddButtonProps } from "@interfaces/IAddButtonProps";

const AddButton: React.FC<IAddButtonProps> = ({ title }) => {
  return (
    <>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ textTransform: "none", mt: 2 }}
      >
        {title}
      </StyledButton>
    </>
  );
};

export default AddButton;
