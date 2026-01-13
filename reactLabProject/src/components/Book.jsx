import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createbookmanager, deletebook, getallbooks, setSelectedBook } from "../slices/bookSlice";
import { useNavigate } from "react-router-dom";
import DailyBook from "./DailyBook";
import { Grid, Modal, Card, CardContent, CardMedia, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, TextareaAutosize } from '@mui/material';
import { getallauthor } from "../slices/authorSlice";

export default function Book() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let booklist = useSelector((state) => state.book.booksList || []);
  let authorlist = useSelector((state) => state.author.authorList || []);
  const chooseCategory_id = useSelector((state) => state.category.selectedCategory_id || "");
  const [filterBookList, setFilterBookList] = useState([]);
  const storeUser = localStorage.getItem("user");
  const user = JSON.parse(storeUser);
  const [categoryId, setCategoryId] = useState(null);
  const [authorId, setAuthoryId] = useState(null);
  const [openBook, setOpenBook] = useState(false);
  const categories = useSelector((state) => state.category.categoryList || []);
  const[ urlImage, setUrlImage] = useState();
  const [title,setTitle]=useState();
  const [dateOut,setDateOut]=useState();
  const [numOfChapters,setNumOfChapters]=useState();
  const [description,setDescription]=useState();
  const [firstChapter,setFirstChapter]=useState();
  const [summary,setSummary]=useState();
  const [lightOrHeavy,setLightOrHeavy]=useState();
  const [whyYes,setWhyYes]=useState();
  const [whyNo,setWhyNo]=useState();


  useEffect(() => {
    dispatch(getallauthor());
  }, [])

  // Filter books whenever booklist or chosen category changes
  useEffect(() => {
    let filteredBooks =booklist?.length>0? booklist?.filter((b) => b.auther !== null): null; // Filter books without an author
    if (chooseCategory_id) {
      filteredBooks = filteredBooks?.filter((b) => b.category?.id === chooseCategory_id); // Filter by category
    }
    setFilterBookList(filteredBooks);
  }, [chooseCategory_id, booklist]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBook(false);
    const book = {
      auther:authorId,
     category : categoryId,
     title:title,
     dateOut:dateOut,
     numOfChapters:numOfChapters,
    description:description,
     firstChapter:firstChapter,
     summary:summary,
     lightOrHeavy:lightOrHeavy,
     whyYes:whyYes,
     whyNo:whyNo

    }
  
    try {
      const response = await dispatch(createbookmanager({book, urlImage})); // הכנסת הספר שנוצר
      if (response.payload) {
        console.log(response);
        dispatch(getallbooks());
      }
      else {
        alert("אי אפשר לכתוב פרק כרגע")
      }

    }
    catch (err) {
      alert("!!!!!!!!!!!!!!!!")
    }
  }



  // Handle book click
  const handleBook = async (book) => {
    dispatch(setSelectedBook(book));
    navigate("/PresentBook");
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await dispatch(deletebook(bookId));
      console.log(response);
    }
    catch (err) {
      booklist = useSelector((state) => state.book.booksList || []);//חוזר שנמחק הספר ולכן ירנדר מחדש

    }
  }
  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Book Grid */}
      <Grid container spacing={4} justifyContent="center" 
      md={11} xs={11}
      sx={{
        borderBottom: {
          xs: "3px solid black",
          marginRight : "3vw"
        }, paddingBottom: "8vh", paddingTop: "4vh"
      }}>
        {filterBookList?.map((book) => (
          <Grid item xs={4} sm={6} md={3} key={book.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >

                   {/* Book Image */}
        <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
          <CardMedia
            component="img"
            alt={book.title}
            height="200"
            src={book?.image}
            sx={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </Box>
              <CardContent
                sx={{
                  textAlign: "center",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", fontSize: { xs: "0.8rem", md: "1.25rem" } }}
                >
                  {book?.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}
                >
                  <strong>מחבר:</strong> {book?.auther?.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}
                >
                  <strong>קטגוריה:</strong> {book?.category?.name}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBook(book)}
                  sx={{
                    marginTop: "1rem",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    fontSize: { xs: "0.75rem", md: "1rem" },
                  }}
                >
                  צפה בפרטים
                </Button>
                {user?.data?.name === "manager" && (

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteBook(book.id)}
                    sx={{
                      marginTop: "1rem",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "25px",
                      fontWeight: "bold",
                      fontSize: { xs: "0.75rem", md: "1rem" },
                    }}
                  >
                    למחוק ספר
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}


        <Box sx={{ textAlign: 'center', mt: 3 }}>
          {user?.data?.name === "manager" &&(
          <Button
            variant="outlined"
            onClick={() => setOpenBook(true)}
            sx={{
              color: '#00b0ff',
              borderColor: '#00b0ff',
              '&:hover': { borderColor: '#ff4081', color: '#ff4081' }
            }}
          >
            הוספת ספר
          </Button>
          )}
        </Box>


        <Modal open={openBook} onClose={() => setOpenBook(false)} sx={{ color: 'black' }}>
          <Box
            sx={{
              fontSize: "16px",
              height: { xs: "60vh", md: "70vh" },
              width: { xs: "80vw", md: "40vw" },
              margin: "auto",
              marginTop: "15vh",
              backgroundColor: 'white',
              borderRadius: "20px",
              padding: 3,
              boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'auto',
              wordWrap: "break-word", // מאלץ מילים לעבור לשורה הבאה אם ​​הן חורגות מהרוחב
              overflowWrap: "break-word", // מבטיח גלישת טקסט עבור מילים ארוכות רצופות
            }}
          >
            <Typography variant="h4" gutterBottom>
              להוסיף ספר
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Category */}
              <FormControl fullWidth>
                <InputLabel>בחר קטגוריה לספר</InputLabel>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories?.length&& categories?.map((category) => (
                    <MenuItem key={category.id} value={category}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Author */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>בחר מחבר לספר</InputLabel>
                <Select
                  value={authorId}
                  onChange={(e) => setAuthoryId(e.target.value)}
                >
                  {authorlist?.length >0&& authorlist?.map((author) => (
                    <MenuItem key={author.id} value={author}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Title */}
              <TextField
                label="Title"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
              />


              {/* Number of Chapters */}
              <TextField
                label="Number of Chapters"
                name="numOfChapters"
                type="number"
                value={numOfChapters}
                onChange={(e)=>setNumOfChapters(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              {/* Description */}
              <Typography variant="body1" sx={{ mt: 2 }}>תיאור</Typography>
              <TextareaAutosize
                minRows={3}
                name="description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                placeholder="Book description..."
              />

              {/* First Chapter */}
              <Typography variant="body1" sx={{ mt: 2 }}>פרק ראשון</Typography>
              <TextareaAutosize
                minRows={3}
                name="firstChapter"
                value={firstChapter}
                onChange={(e)=>setFirstChapter(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                placeholder="First chapter text..."
              />

              {/* Summary */}
              <TextField
                label="Summary"
                name="summary"
                value={summary}
                onChange={(e)=>setSummary(e.target.value)}
                fullWidth
                margin="normal"
              />

              {/* Light or Heavy */}
              <TextField
                label="Light or Heavy"
                name="lightOrHeavy"
                value={lightOrHeavy}
                onChange={(e)=>setLightOrHeavy(e.target.value)}
                fullWidth
                margin="normal"
              />

              {/* Why Yes */}
              <TextField
                label="Why Yes"
                name="whyYes"
                value={whyYes}
                onChange={(e)=>setWhyYes(e.target.value)}
                fullWidth
                margin="normal"
              />

              {/* Why No */}
              <TextField
                label="Why No"
                name="whyNo"
                value={whyNo}
                onChange={(e)=>setWhyNo(e.target.value)}
                fullWidth
                margin="normal"
              />
          {/* Image Upload */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            העלאת תמונה
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setUrlImage(e.target.files[0])}
            style={{ marginTop: "8px", marginBottom: "16px" }}
          />
              {/* Submit Button */}
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
                יצירה
              </Button>
            </form>
          </Box>
        </Modal>


      </Grid>

      {/* Show DailyBook if no category is selected */}
      {!chooseCategory_id && (
        <Box sx={{ marginTop: "3rem" }}>
          <DailyBook />
        </Box>
      )}
    </Box>
  );
}
