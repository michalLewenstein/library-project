import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallcategory, setSelectedCategory } from '../slices/categorySlice';
import Book from '../components/Book';
import { Grid, Box, Button } from "@mui/material";
import { getallbooks } from '../slices/bookSlice';
import '../styles/HomePage.css'
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categoryList || []);
  const chooseCategory_id = useSelector((state) => state.category.selectedCategory_id || '');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getallcategory()); // קריאה לכל הקטגוריות
    dispatch(getallbooks()); // קריאה לכל הספרים
  }, [dispatch]);

  const chooseCategory = (c) => {
    dispatch(setSelectedCategory(c.id));
  };

  return (
    <Fragment>
      {/* Main Container */}
      <Grid container justifyContent="center" sx={{ marginTop: { xs: "5%", md: "2%" } }}>
        <Grid item md={11} xs={11} sx={{ borderBottom: "3px solid black", paddingBottom: "3vh"}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // מרכז את הכפתורים
              flexWrap: "wrap", // יאפשר שבירת שורות
              gap: "1rem", // רווחים אחידים בין הכפתורים
              padding: "1rem 0", // רווח פנימי
            }}
          >
            {/* כפתורים לקטגוריות */}
            {categories?.length&& categories?.map((category) => (
              <Button
                key={category?.id}
                variant={chooseCategory_id === category?.id ? "contained" : "outlined"}
                onClick={() => chooseCategory(category)}
                sx={{
                  width: { xs: "20%", sm: "12vw" }, // גודל רספונסיבי
                  minWidth: "100px",
                  height: "50px", // גובה אחיד
                  fontSize: "1rem",
                  borderRadius: "50px", // עיצוב עגול
                  borderWidth: "3px", // מסגרת עבה
                  borderColor: chooseCategory_id === category?.id ? "primary.main" : "gray",
                  color: chooseCategory_id === category?.id ? "white" : "gray",
                  "&:hover": {
                    borderColor: "primary.dark", // מסגרת בצבע אחר בהובר
                    backgroundColor: "primary.dark", // רקע בהיר בהובר
                    color: 'white'
                  },
                }}
              >
                {category?.name}
              </Button>
            ))}

            {/* כפתור ספר בהמשכים */}
            <Button
              variant={open ? "contained" : "outlined"}
              onClick={() => setOpen(true)}
              sx={{
                width: { xs: "20%", sm: "12vw" },
                minWidth: "120px",
                height: "50px",
                fontSize: "1rem",
                borderRadius: "50px", // עיצוב עגול
                borderWidth: "3px", // מסגרת עבה
                borderColor: open ? "primary.main" : "gray",
                color: open ? "white" : "gray",
                "&:hover": {
                  borderColor: "primary.dark", // מסגרת בצבע אחר בהובר
                  backgroundColor: "primary.dark", // רקע בהיר בהובר
                  color: 'white'
                },
              }}
            >
              ספר בהמשכים
            </Button>
          </Box>
        </Grid>
        <Book />
      </Grid>
      
      {open && 
      navigate('/Chapter')
      }
    </Fragment>
  );
}
