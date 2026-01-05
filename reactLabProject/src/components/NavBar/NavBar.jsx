import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Logo from '/images/logo.png';
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import HamburgerMenu from "./HamburgerMenu";

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'black',
        direction: "rtl",
      }}
    >
      <Toolbar>
        {/* Mobile menu*/}
        <HamburgerMenu />

        {/* logo */}
        <Typography sx={{ mx: 4 }}>
          <Link to="/HomePage">
            <img src={Logo} alt="Logo" style={{ width: "7vw" }} />
          </Link>
        </Typography>

        {/* search */}
        <SearchBar />

        <Box sx={{ flexGrow: 1 }} />

        {/* user menu*/}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}