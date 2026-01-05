import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function HamburgerMenu() {
    // place to display
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MenuIcon />
      </IconButton>

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem component={Link} to="/HomePage">דף הבית</MenuItem>
        <MenuItem component={Link} to="/Login">התחברות</MenuItem>
        <MenuItem component={Link} to="/Signup">הרשמה</MenuItem>
      </Menu>
    </>
  );
}
