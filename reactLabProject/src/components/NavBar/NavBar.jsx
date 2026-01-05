import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch} from "react-redux";
import { getallbooksbysearch } from '../slices/bookSlice';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/images/logo.png';
import { setSelectedCategory } from '../slices/categorySlice';


// עיצוב האלמנט הראשי של שדה החיפוש
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.black, 0.25) },
  marginLeft: theme.spacing(3),
  width: '30%',
  border: '1px solid #008fff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  marginRight: '2vw',
}));

// עיצוב שדה הקלט של שדה החיפוש
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  color: 'white',
  paddingLeft: theme.spacing(2),
}));

// עיצוב כפתור הניקוי (Clear)
const ClearButton = styled(IconButton)(({ theme }) => ({
  color: '#008fff',
  marginRight: theme.spacing(1),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#008fff',
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hamburgerAnchorEl, setHamburgerAnchorEl] = React.useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  // const user = useSelector((state) => state.userDetails.user || null);
  const storeUser = localStorage.getItem("user")
  const user = JSON.parse(storeUser);
  console.log("userrrrrrrrrrrrrr", user);

  // const [countMessage, setCountMessage] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:768px)'); // גודל מסך

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');

  const isHamburgerMenuOpen = Boolean(hamburgerAnchorEl);
  const isUserMenuOpen = Boolean(anchorEl);
  const isMoreMenuOpen = Boolean(moreAnchorEl);

  const handleHamburgerMenuOpen = (event) => setHamburgerAnchorEl(event.currentTarget);
  const handleHamburgerMenuClose = () => setHamburgerAnchorEl(null);

  const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const handleMoreMenuOpen = (event) => setMoreAnchorEl(event.currentTarget);
  const handleMoreMenuClose = () => setMoreAnchorEl(null);

  const search = () => {
    if (searchValue !== '') {
      dispatch(getallbooksbysearch(searchValue));
      navigate("/Search");
    }
  };

  const renderUserMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isUserMenuOpen}
      onClose={handleUserMenuClose}
    >
      <MenuItem disabled>
        <Typography variant="subtitle1" sx={{
          fontWeight: "bold",
          backgroundColor: "#1e88e5",
          width: "100%",
          textAlign: "center"
        }}>
          {user ? (
            user.data?.name + " 😊 "
          )
            :
            <p>שם משתמש</p>
          }
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleUserMenuClose}>
        <EditIcon sx={{ marginRight: 1 }} />
        <Link to='/UpdateUser' style={{ textDecoration: 'none', color: 'black' }}>עדכון פרטים</Link>

      </MenuItem>
      <MenuItem onClick={handleUserMenuClose}>
        <FavoriteIcon sx={{ marginRight: 1 }} />
        המועדפים שלי
      </MenuItem>
    </Menu>
  );

  const renderHamburgerMenu = (
    <Menu
      anchorEl={hamburgerAnchorEl}
      keepMounted
      open={isHamburgerMenuOpen}
      onClose={handleHamburgerMenuClose}
    >
      <MenuItem onClick={handleHamburgerMenuClose}>
        <a href="/HomePage" style={{ textDecoration: 'none', color: 'black' }}>דף הבית</a>
      </MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}>
        <a href="/Login" style={{ textDecoration: 'none', color: 'black' }}>התחברות</a>
      </MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}>
        <a href="/Signup" style={{ textDecoration: 'none', color: 'black' }}>הרשמה</a>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, direction: 'rtl', alignItems: "center" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'black',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleHamburgerMenuOpen}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {renderHamburgerMenu}
          <Typography variant="h6" noWrap sx={{ marginRight: 4, marginLeft: 4 }}>
            <Link to='/HomePage' onClick={() => dispatch(setSelectedCategory(null))}><img src={Logo} alt="Logo" style={{ width: '7vw' }} /></Link>
          </Typography>
          <Search>
            <SearchIconWrapper onClick={search}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="חיפוש לפי שם ספר, שם סופר/ת או נושא"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <ClearButton onClick={() => setSearchValue('')}>
                <CloseIcon />
              </ClearButton>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {/* {!isMobile && (
            <>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={countMessage} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <FavoriteIcon />
              </IconButton>
            </>
          )} */}
          {isMobile && (
            <IconButton
              size="large"
              color="inherit"
              aria-label="more"
              onClick={handleMoreMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          )}
          {/* {renderMoreMenu} */}
          <IconButton size="large" color="inherit" onClick={handleUserMenuOpen}>
            <Badge color="error">
              <AccountCircle />
            </Badge>
          </IconButton>
          {renderUserMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
