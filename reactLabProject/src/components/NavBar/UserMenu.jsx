import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchor);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
        <Badge>
          <AccountCircle />
        </Badge>
      </IconButton>

      <Menu open={isUserMenuOpen} anchorEl={userMenuAnchor} onClose={() => setUserMenuAnchor(null)}>
        <MenuItem disabled>
          <Typography fontWeight="bold">
            {user?.data?.name || "שם משתמש"}
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <EditIcon sx={{ mr: 1 }} />
          <Link to="/UpdateUser">עדכון פרטים</Link>
        </MenuItem>

        <MenuItem>
          <FavoriteIcon sx={{ mr: 1 }} />
          המועדפים שלי
        </MenuItem>
      </Menu>
    </>
  );
}
