import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
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
import LogoutIcon from "@mui/icons-material/Logout";


export default function UserMenu() {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchor);

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserMenuAnchor(null);
    dispatch(logout());
    navigate("/Login");
  };

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
            {user?.name || "שם משתמש"}
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
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          התנתקות
        </MenuItem>

      </Menu>
    </>
  );
}
