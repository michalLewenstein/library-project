import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getallbooksbysearch } from "../../slices/bookSlice";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

// Design the main element of the search field
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.black, 0.25) },
    marginLeft: theme.spacing(3),
    width: "30%",
    border: "1px solid #008fff",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
}));

// Format the search field input field
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    flex: 1,
    color: 'white',
    paddingLeft: theme.spacing(2),
}));

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (searchValue) {
            dispatch(getallbooksbysearch(searchValue));
            navigate("/Search");
        }
    };

    return (
        <Search>
            <IconButton onClick={handleSearch}>
                <SearchIcon sx={{ color: "#008fff" }} />
            </IconButton>

            <StyledInputBase
                placeholder="חיפוש לפי שם ספר, שם סופר/ת או נושא"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {searchValue && (
                <IconButton onClick={() => setSearchValue("")}>
                    <CloseIcon sx={{ color: "#008fff" }} />
                </IconButton>
            )}
        </Search>
    );
}
