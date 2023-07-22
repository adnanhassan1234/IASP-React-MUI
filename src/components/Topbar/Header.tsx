import Toolbar from "@mui/material/Toolbar";
import searchIconLight from "@assets/icons/light.svg";
import Box from "@mui/material/Box";
import {
  StyledAppBar,
  StyledAvatar,
  StyledInputField,
  StyledLedianShera,
  StyledRightBlock,
  StyledSearchBox,
  StyledTitle,
} from "./style.ts";
import { useSelector } from "react-redux";
import { IHeaderProps } from "@interfaces/IHeaderProps.ts";

const Header: React.FC<IHeaderProps> = (props) => {
  const user = useSelector((state: any) => state.userDetails.user.user);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <StyledAppBar>
        <Toolbar>
          <Box display="flex" alignItems="center">
            <StyledTitle variant="h6">{props.title}</StyledTitle>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexGrow={1}
          >
            <StyledSearchBox>
              <StyledInputField
                variant="standard"
                size="small"
                placeholder=" Search or type something"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <>
                      <img src={searchIconLight} alt="" />
                    </>
                  ),
                }}
              />
            </StyledSearchBox>
            <StyledRightBlock>
              <StyledLedianShera variant="body1">
                {user.firstName + " " + user.lastName}
              </StyledLedianShera>
              <StyledAvatar />
            </StyledRightBlock>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Header;
