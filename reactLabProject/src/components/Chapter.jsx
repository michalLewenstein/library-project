import React, { useEffect, useState } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import {
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Modal
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getallcategory } from "../slices/categorySlice";
import { createbookcategoryId, getallbooks, getallchapters, updatebook } from "../slices/bookSlice";
import { createchapter } from "../slices/chapterSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Chapter() {
  const categories = useSelector((state) => state.category.categoryList || []);
  const bookList = useSelector((state) => state.book.booksList || [])
  const dispatch = useDispatch();
  const [chapterNum, setChapterNum] = useState(0); //מספר הפרק
  const [title, setTitle] = useState(""); //כותרת הפרק
  const [categoryId, setCategoryId] = useState(''); //מזהה קטגוריה
  const [book, setBook] = useState(null); //אובייקט הספר הפתוח כרגע
  const storeUser = localStorage.getItem("user"); //הבאה של היוזר
  const user = JSON.parse(storeUser); //המשתמש שכרגע מחובר
  console.log("המשתנה שכרגע נמצא במערכת", user.data);
  const chapters = useSelector((state) => state.book.chapters || []); //מערך פרקים לספר
  const [bookChapters, setBookChapters] = useState();
  const [chapterData, setChapterData] = useState(); // תוכן הפרק
  const [manager, setManager] = useState();
  const [openBook, setOpenBook] = useState(true);
  const [popap, setPopap]= useState(false);
  const [popapText, setPopapText] = useState();
  let author = null;


  // עיצוב של התיבת טקסט
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e88e5", // Main blue color
      },
      secondary: {
        main: "#1565c0", // A darker shade of blue
      },
      background: {
        default: "#f9f9f9", // Default light background
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h3: {
        fontWeight: 600,
        color: "#1e88e5", // Match the primary color
      },
      h4: {
        fontWeight: 500,
        color: "#1565c0", // Match the secondary color
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
          },
        },
      },
    },
  });

  useEffect(() => {
    dispatch(getallcategory());
    dispatch(getallbooks());
  }, [dispatch]);

  useEffect(()=>{
   
  },[openBook])
  //בדיקה האם זה מנהל 
  useEffect(() => {
    if (user?.data?.name === "manager")
      setManager(user.data);
  }, [])
  //בדיקה האם יש ספר בהמשכים פתוח
  //אם הערך של ספר ישאר  זה אומר שאין ספר פתוחnull 
  useEffect(() => {
    const openBook = bookList?.length>0 ? bookList.find((b) => b.auther === null): null ;
    setBook(openBook || null);
    if (openBook) {
      setBookChapters(openBook.chapters);
    }
  }, [bookList]);

  useEffect(() => {
    if (book?.id) {
      dispatch(getallchapters(book.id));
    }
    
    
  }, [book]);

  useEffect(() => {
    setBookChapters(chapters.data);

  }, [chapters])

  //פתיחת ספר חדש 
  const handleCreateBook = async () => {
    const newBook = {
      title: title,
      authorId: user.data.id,
    }

    const send = {
      newBook,
      categoryId
    };
    try {
      const response = await dispatch(createbookcategoryId(send)); // הכנסת הספר שנוצר
      if (response.payload) {
        console.log(response);
        setBook(response.payload)
        console.log(book);
        setChapterNum(1);
      }
      else {
        alert("אי אפשר לכתוב פרק כרגע")
      }

    }
    catch (err) {
      alert("!!!!!!!!!!!!!!!!")
    }
  }

  //פונקציה שיוצרת פרק חדש
  const handleCreateChapter = async () => {
    //אובייקט ליצירת בקשה ליצירת פרק
    const newChapter = {
      chapterNumber: book.numOfChapters + 1,
      author: user.data,
      dataOfChapter: chapterData,
      book: book
    }
    console.log(newChapter);

    try {
      const response = await dispatch(createchapter(newChapter));
      setBook(response.payload.book);
      alert("הפרק עודכן")
    }
    catch (err) {
      alert("הפרק לא נקלט")
    }
  }

  //הוספת פרק עדכון הספר שיהיה סגור ומי כותב אותו
  const addChapter = async () => {
    const updateBook = {
      id: book.id,
      authorId: user.data.id,
      auther : author,
      firstChapter : chapters?.data?.[0]?.dataOfChapter? chapters.data[0].dataOfChapter: null,
    }
    console.log(updateBook);

    try {
      const response = await dispatch(updatebook(updateBook));
      setBook(response.payload.data);

    }
    catch (err) {
      alert("שגיאה")
    }
  }

  //מנהל סוגר את הספר
  const closeBook = async()=>{
      author = 
      {id: 1,
       name : "ספר בהמשכים"       
      };
      
      addChapter();
  }

  const handleOpen = (content) => {
    setPopapText(content);
    setPopap(true);
  };

  const handleClose = () => {
    setPopap(false);
    setPopapText("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "2rem" }}>
        {chapterNum === 0 && !book ? (
          <Box textAlign="center" sx={{ mt: "20vh",marginBottom: "20vh" }}>
            <Typography variant="h3">לפתיחת ספר חדש</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setChapterNum(1)}
            >
              <BookmarksIcon /> פתיחת ספר
            </Button>
          </Box>
        ) : !book ? (
          <Grid container spacing={3} justifyContent="center"sx={{width: "55vw" }} >
            <Grid item xs={12} md={6} >
              <Card sx={{ boxShadow: 3}}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    בחר שם לספר
                  </Typography>
                  <TextField
                    fullWidth
                    sx={{ mb: 2, width: '100%', maxWidth: '500px', maxHeight: '60px' }}
                    label="שם הספר"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <FormControl fullWidth>
                    <InputLabel>בחר קטגוריה לספר</InputLabel>
                    <Select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      {categories?.length>0&& categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, width: "100%" }}
                    onClick={handleCreateBook}
                  >
                    פתיחת ספר
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
<Box>
  {/* Title with space above */}
  <Typography
    variant="h4"
    gutterBottom
    style={{ color: '#1e88e5', marginTop: '20px' }} // Add space above the title
  >
    ספר : {book.title}
  </Typography>

  {/* Grid Container with spacing adjustments */}
  <Grid container spacing={0.5} sx={{ mt: 3 }}> {/* Reduced spacing and increased top margin */}
  {bookChapters &&
    bookChapters.map((chapter) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        key={chapter.id} 
        sx={{ display: 'flex', justifyContent: 'center' }} // Centers cards
      >
        <Card
          sx={{
            boxShadow: 3,
            width: { xs: '70vw', sm: '45vw', md: '30vw' }, // Expanded width
            height: { xs: '35vh', sm: '25vh', md: '30vh' }, // Expanded height
            marginTop: { xs: '10px', md: '20px' }, // Adds upper space for all cards
          }}
          onClick={() => handleOpen(chapter.dataOfChapter)}
        >
          <CardContent
            sx={{
              padding: 1, // Keeps a little padding
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start', // Aligns content to the top
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ color: '#1e88e5', margin: 0, padding: 0 }}
            >
              <p style={{ margin: 0, padding: 0, marginBottom:"5vh", marginTop:"2vh" }}>פרק : {chapter.chapterNumber}</p>
              <p style={{ margin: 0, padding: 0 }}>מחבר : {chapter.author.name}</p>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
</Grid>

</Box>
        )}
        {/* תוכן הפרק */}
        <Modal open={popap} onClose={handleClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '80vw', sm: '60vw', md: '40vw' }, // Responsive modal width
      bgcolor: 'background.paper',
      borderRadius: '10px',
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      תוכן הפרק
    </Typography>
    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
      {popapText}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={handleClose}
      sx={{ mt: 2 }}
    >
      סגור
    </Button>
  </Box>
</Modal>

        {book?.openOrClose===false  && openBook &&(
          <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            marginRight: { xs: 2, sm: 4, md: 5 }, // Margin adjusts based on screen size
            width: { xs: "30%", sm: "30%", md: "10vw" }, // Width reduces on smaller screens
            height: { xs: "10vh", sm: "7vh", md: "8vh" }, // Height adapts to smaller screens
          }}
            onClick={addChapter}
          >
            הוספת פרק
          </Button>
        )}

        {book?.openOrClose && book?.authorId === user.data.id && (
          <Box sx={{ mt: 4 }}>
            <TextField
              fullWidth
               sx={{width: "50vw"}}
              label={`כתיבת פרק  ${book.numOfChapters + 1}`}
              variant="outlined"
              multiline
              rows={4}
              onChange={(e) => setChapterData(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                marginRight: { xs: 2, sm: 4, md: 5 }, // Margin adjusts based on screen size
                width: { xs: "30%", sm: "30%", md: "10vw" }, // Width reduces on smaller screens
                height: { xs: "10vh", sm: "7vh", md: "8vh" }, // Height adapts to smaller screens
              }}
              onClick={handleCreateChapter}
            >
              סיום הפרק
            </Button>
          </Box>
        )}
        {book?.openOrClose && book.authorId !== user.data.id && (
          <h1> מישהו באמצע לכתוב פרק</h1>
        )}
        {/* אם זה מנהל הוא יכול לסגור את הספר */}
        {manager && book&& !book?.openOrClose&& openBook&&(
           <Button
           variant="contained"
           color="primary"
           sx={{
            mt: 2,
            marginRight: { xs: 2, sm: 4, md: 5 }, // Margin adjusts based on screen size
            width: { xs: "30%", sm: "30%", md: "10vw" }, // Width reduces on smaller screens
            height: { xs: "10vh", sm: "7vh", md: "8vh" }, // Height adapts to smaller screens
          }}
          onClick={() => {
            setOpenBook(false);
            closeBook();
          }}
         >
            סגירת הספר
          </Button >
        )}
      </Box>
    </ThemeProvider>
  );
}