import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createresponse, deleteresponse, getallresponse } from "../slices/responseSlice";
import { getallchapters, getbookbyid } from "../slices/bookSlice";
import { makeStyles } from "@mui/styles";
import { Grid, Box, Typography, Modal, GlobalStyles, Input, TextField, Rating, Button, Card, CardContent } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';



const labels = {
  1: 'משעמם',
  2: 'ירוד',
  3: 'בסדר',
  4: 'טוב',
  5: 'מעניין מאוד!',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});


export default function PresentBook() {
  // Get the selected book from Redux state
  const book = localStorage.getItem("selectedBook");
  const b = JSON.parse(book);
  const bookId = b?.id;
  const bookState = useSelector((state) => state.book.book || null);
  const [selectBook, setSelectedBook] = useState();
  const [open, setOpen] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [name, setName] = useState();
  const [userResponse, setUserResponse] = useState();
  const [value, setValue] = React.useState(2); //לדירוג כוכבים
  const [hover, setHover] = React.useState(-1); // לדירוג כוכבים
  const classes = useStyles();
  const responseList = useSelector((state) => state.response.responseList || []);
  const [responseFilterList, setResponseFilterList] = useState();
  const dispatch = useDispatch();
  const storeUser = localStorage.getItem("user");
  const user = JSON.parse(storeUser);
  const chapters = useSelector((state) => state.book.chapters || []);
  const [bookChapters, setBookChapters] = useState();
  const [showAll, setShowAll] = useState(false);
  const [popap, setPopap] = useState(false);
  const [popapText, setPopapText] = useState();


  // פונקציה להחלפת מצב
  const changeShowAll = () => {
    setShowAll(!showAll);
  };

  // בחר 4 כרטיסים ראשונים אם לא מציגים הכל
  const displayedChapters = showAll ? bookChapters : bookChapters?.slice(0, 4);


  useEffect(() => {
    console.log("bookState", bookState);
    setSelectedBook(bookState);
  }, [bookState])

  useEffect(() => {

    setBookChapters(chapters.data)
  }, [chapters])


  useEffect(() => {
    if (book) {
      setSelectedBook(b);
      console.log("bookId", bookId);
      dispatch(getbookbyid(bookId));
    }
  }, [book])

  useEffect(() => {
    dispatch(getallresponse(selectBook?.id));
    dispatch(getallchapters(selectBook?.id));
  }, [selectBook])

  useEffect(() => {
    if (Array.isArray(responseList)) {
      const list = responseList?.slice().sort((a, b) => b.score - a.score);
      if (list) {
        setResponseFilterList(list);
        console.log(responseFilterList);

      }
    }

    setSelectedBook(bookState)
  }, [responseList])


  useEffect(() => {
  }, [value])

  //שליחת תגובה לשרת 
  const handleSubmit = async () => {
    if (!userResponse || !name || !value || !selectBook) {
      alert("שדות חובה");
      return;
    }
    setOpenResponse(false)
    const newResponse = {
      response: userResponse,
      name: name,
      score: value,
      book: selectBook
    }
    console.log(newResponse);

    try {
      const response = await dispatch(createresponse(newResponse));
      console.log(response);
      dispatch(getallresponse(selectBook.id)); //קריאה מחדש לרשימת תגובות
      dispatch(getbookbyid(bookId));
    }
    catch (err) {
      alert("err")
    }
  }

  const handleDeleteResponse = async (responseId) => {
    try {
      const response = await dispatch(deleteresponse(responseId));
      console.log(response);
      dispatch(getbookbyid(bookId));
    }
    catch (err) {
      setResponseFilterList(useSelector((state) => state.response.responseList || []));
    }
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // גובה כל המסך
        width: "100vw",
        margin: 0,
        padding: 0,

      }}>

      <Box
        sx={{
          position: "relative", // הכנה לשכבות
          height: "90vh",
          width: "100vw",
          overflow: "hidden", // מבטיח שהתוכן לא יחרוג מהקונטיינר
        }}
      >
        {/* שכבה 1: רקע מטושטש */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(/images/${selectBook?.title}.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(10px)", // הטשטוש
            zIndex: 1, // שכבה תחתונה
          }}
        />

        {/* שכבה 2: תוכן */}
        <Box
          sx={{
            position: "relative", // מיקום התוכן מעל הרקע
            zIndex: 2, // שכבה עליונה
            bgcolor: "rgba(151, 137, 137, 0.7)", // רקע שקוף
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            height: "100vh",
          }}
        >
          {/* ==חלק עליון== */}
          <Grid
            container
          >
            {/* צד שמאל */}
            <Grid
              item
              md={4}
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: 0,
                padding: 0,
              }}
            >

              <img
                src={`data: image/png; base64, ${selectBook?.image}`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.png'; }}
                alt="תיאור התמונה"
                style={{
                  maxWidth: "70%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  marginTop: "12vh"
                }}
              />
            </Grid>

            {/* צד ימין */}
            <Grid
              item
              md={8}
              xs={8}
              sx={{
                color: "black",
                direction: "rtl",
                marginLeft: 0,
                paddingTop: "20vh",
                paddingLeft: "40vw",
                textAlign: "right"

              }}
            >
              <strong style={{ fontSize: "clamp(20px, 2vw, 40px)", color: 'white' }}>
                {selectBook?.title}
              </strong>
              <h3 style={{
                margin: "10px 0", color: 'white', marginTop: "5vh",
                fontSize: "clamp(13px, 2vw, 22px)" // מינימום 18px, מקסימום 32px, מבוסס על 2vw
              }}>
                <span  > מחבר: </span>{" "}
                {selectBook?.auther?.name}
              </h3>
              <h3 style={{
                margin: "10px 0", color: 'white', marginTop: "5vh",
                fontSize: "clamp(13px, 2vw, 22px)" // מינימום 18px, מקסימום 32px, מבוסס על 2vw
              }}>
                <span > קטגוריה: </span>{" "}
                {selectBook?.category?.name}
              </h3>
              <h3 style={{
                margin: "10px 0", color: 'white', marginTop: "5vh",
                fontSize: "clamp(13px, 2vw, 22px)" // מינימום 18px, מקסימום 32px, מבוסס על 2vw
              }}>
                <span > מספר כוכבים: </span>{" "}
                {selectBook?.countScore}
              </h3>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* ==החלק התחתון ==*/}
      <Box
        sx={{
          width: "98%",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#333",
          color: "white",
          height: "clamp(200vh, 150vh)",

        }}
      >
        {/* צד ימין */}
        <Grid item md={6} xs={12}
          sx={{
            paddingTop: "7vh",
            paddingRight: "8vw"
          }}
        >
          <Typography variant="h4" sx={{
            borderBottom: "2px solid white",
            fontSize: "clamp(17px, 2vw, 32px)" // מינימום 18px, מקסימום 32px, מבוסס על 2vw
          }}>
            <h4>עוד על הספר</h4>
          </Typography>

          <Typography variant="h6" sx={{
            marginTop: "20px",
            fontSize: "clamp(16px, 2vw, 32px)"
          }}>
            <strong>פרטי הספר:</strong>
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "10px",
            fontSize: "clamp(13px, 2vw, 22px)"
          }}>
            <strong>מחבר:</strong> {selectBook?.auther?.name}
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "10px",
            fontSize: "clamp(13px, 2vw, 22px)"
          }}>
            <strong>קטגוריה:</strong> {selectBook?.category?.name}
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "10px",
            fontSize: "clamp(13px, 2vw, 22px)"
          }}>
            <strong>תאריך הוצאה:</strong> {selectBook?.dateOut}
          </Typography>

          <Typography variant="h4" sx={{ borderBottom: "2px solid white", fontSize: "clamp(17px, 2vw, 32px)" }}>
            <h4>סיכום הספר</h4>
          </Typography>

          <Typography variant="h6" sx={{ marginTop: "20px", fontSize: "clamp(10px, 2vw, 22px)" }} >
            <strong>בכמה מילים : </strong> {selectBook?.summary}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "20px", marginBottom: "10px", fontSize: "clamp(10px, 2vw, 22px)" }}>
            <strong>קל/כבד :</strong> {selectBook?.lightOrHeavy}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "20px", marginBottom: "10px", fontSize: "clamp(10px, 2vw, 22px)" }}>
            <strong> למה כן :</strong> {selectBook?.whyYes}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "20px", marginBottom: "10px", fontSize: "clamp(10px, 2vw, 22px)" }}>
            <strong> למה לא :</strong> {selectBook?.whyNo}
          </Typography>
        </Grid>

        {/* צד שמאל */}
        <Grid item md={6} xs={12}
          sx={{
            paddingTop: "15vh",
            paddingLeft: "8vw",
            paddingRight: "5vw"
          }}
        >
          <Typography variant="h5"
            sx={{
              marginBottom: "2px",
              borderBottom: "2px solid white",
              width: "60vw",
              textAlign: "right"
            }}>
            תקציר
          </Typography>
          <Typography variant="body1"
            sx={{
              maxWidth: "50vw", // רוחב מקסימלי
              wordWrap: "break-word", // מאלץ מילים לעבור לשורה הבאה אם ​​הן חורגות מהרוחב
              overflowWrap: "break-word", // מבטיח גלישת טקסט עבור מילים ארוכות רצופות
            }}
          >
            <h3>{selectBook?.description}</h3>

          </Typography>

          <Typography variant="h5"
            sx={{
              marginTop: "20vh",
              borderBottom: "2px solid white",
              textAlign: "right",
              maxWidth: "60vw", // רוחב מקסימלי
              wordWrap: "break-word", // מאלץ מילים לעבור לשורה הבאה אם ​​הן חורגות מהרוחב
              overflowWrap: "break-word", // מבטיח גלישת טקסט עבור מילים ארוכות רצופות
            }}>
            פרק ראשון
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginTop: "4vh",
              position: "relative",
              display: "-webkit-box",
              WebkitLineClamp: 2, // מספר השורות המקסימלי
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              maxWidth: "300px", // ניתן להתאים את הרוחב של המשפט
              fontSize: "16px",
              lineHeight: "1.5",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "1.5em", // גובה השכבה
                background:
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(33, 33, 33, 0.5) 50%, rgba(33, 33, 33, 1) 100%)",
              },
            }}
            onClick={() => setOpen(true)}
          >
            {selectBook?.firstChapter}
          </Typography>
          {/* {popap עם תוכן הפרק הראשון} */}
          <Modal open={open} onClose={() => setOpen(false)}
            sx={{ color: 'black' }}>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',//מאפשר גלגלת
                flexDirection: 'column',
                fontSize: "16px",
                height: "60vh",
                width: "70vw",
                marginRight: "14vw",
                marginTop: "20vh",
                backgroundColor: 'white',
              }}>
              {/* עיצוב גלגלת */}
              <GlobalStyles styles={{
                '*::-webkit-scrollbar': {
                  width: '10px',
                  backgroundColor: '#f0f8ff', // צבע רקע הגלילה
                },
                '*::-webkit-scrollbar-thumb': {
                  backgroundColor: '#4682b4', // צבע תכלת
                  borderRadius: '10px', // עיגול הגלגלת
                },

              }} />
              {/* עיצוה  החלק העליון */}
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 3,
                }}
              >
                {selectBook?.title} / {selectBook?.auther?.name}
              </Typography>
              {/* עיצוב הטקסט הפנימי */}
              <Box
                sx={{
                  p: 2,
                  flex: 1, // Use remaining space for this box
                  overflowY: 'auto', // Enable vertical scrolling if content exceeds height
                  direction: 'rtl', // Ensures scrollbar appears on the left side for RTL languages
                  textAlign: 'left', // Align content to the left
                  whiteSpace: 'normal', // Allow automatic line wrapping
                  wordBreak: 'break-word', // Break long words if needed
                  textAlign: "right",
                  marginLeft: "5vw",
                  marginRight: "5vw"
                }}
              >
                <Typography variant="body1">
                  {selectBook?.firstChapter}
                </Typography>
              </Box>
            </Typography>
          </Modal>



























          {selectBook?.auther?.name === "ספר בהמשכים" && (
            <>
              <Typography variant="h5"
                sx={{
                  marginBottom: "2px",
                  borderBottom: "2px solid white",
                  width: "60vw",
                  textAlign: "right",
                  marginTop: "20vh",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}>
                קריאת כל הפרקים
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {displayedChapters &&
                  displayedChapters.map((chapter) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3} // שינוי כאן כדי שיהיו 4 בשורה
                      key={chapter.id}
                      sx={{ marginTop: "5vh" }}
                    >
                      <Card
                        sx={{
                          boxShadow: 3,
                          width: '100%', // כרטיס תופס את כל הרוחב של הטור
                          height: '150px', // גובה כרטיס מותאם
                        }}
                        onClick={() => handleOpen(chapter.dataOfChapter)}
                      >
                        <CardContent
                          sx={{
                            padding: 1,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="h6" sx={{ color: '#1e88e5', textAlign: 'center' }}>
                            פרק: {chapter.chapterNumber}
                          </Typography>
                          <Typography variant="body2" sx={{ textAlign: 'center' }}>
                            מחבר: {chapter.author.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>

              {/* כפתור להרחבת הצגה */}
              <Button
                onClick={changeShowAll}
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              >
                {showAll ? 'הצג פחות' : 'הצג הכל'}
              </Button>

            </>
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










          {/* תגובות */}
          <Typography variant="h5"
            sx={{
              marginTop: "20vh",
              borderBottom: "2px solid white",
              textAlign: "right",
              maxWidth: "60vw", // רוחב מקסימלי
              wordWrap: "break-word", // מאלץ מילים לעבור לשורה הבאה אם ​​הן חורגות מהרוחב
              overflowWrap: "break-word", // מבטיח גלישת טקסט עבור מילים ארוכות רצופות
            }}>
            מה חשבו הקוראים?
          </Typography>
          <Box sx={{ p: 2 }}>
            {responseFilterList && responseFilterList.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  mb: 4,
                  borderBottom: "2px solid white",
                  maxWidth: "60vw", // רוחב מקסימלי
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  mx: "auto", // ממורכז באמצע המסך
                  textAlign: "right"
                }}
              >
                {/* תאריך */}
                <Typography
                  variant="caption"
                  color="gray"
                  gutterBottom
                  sx={{
                    fontSize: "clamp(1px, 2vw, 15px)",
                    textAlign: "left",
                    display: "block"
                  }}
                >
                  {comment.dateOfResponse}
                </Typography>
                {user?.data?.name === "manager" && (

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteResponse(comment.id)}
                    sx={{
                      marginTop: "1rem",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "25px",
                      fontWeight: "bold",
                      fontSize: { xs: "0.75rem", md: "1rem" },
                    }}
                  >
                    למחוק תגובה
                  </Button>
                )}

                {/* כוכבים */}
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Box sx={{ display: "flex" }}>
                    {Array.from({ length: comment.score }).map((_, index) => (
                      <StarIcon
                        key={index}
                        sx={{ color: '#ff4081', fontSize: 18, mr: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* שם */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#00b0ff',
                    ml: 1,
                    fontSize: "clamp(11px, 2vw, 20px)",
                    marginBottom: "6vh",
                    display: "block"
                  }}
                >
                  {comment.name}
                </Typography>

                {/* תגובה */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    marginBottom: "6vh",
                    fontSize: { xs: "14px", sm: "16px", md: "18px" }
                  }}
                >
                  {comment.response}
                </Typography>
              </Box>
            ))}

            {/* הוסף תגובה */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenResponse(true)}
                sx={{
                  color: '#00b0ff',
                  borderColor: '#00b0ff',
                  '&:hover': { borderColor: '#ff4081', color: '#ff4081' }
                }}
              >
                הוספת תגובה
              </Button>
            </Box>
          </Box>


          {/*כתיבת  תגובות */}
          <Modal open={openResponse} onClose={() => setOpenResponse(false)} sx={{ color: 'black' }}>
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
              }}
            >
              {/* כותרת עליונה */}
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 1,
                  px: 3,
                  borderRadius: "20px 20px 0 0",
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                תגובה לספר {selectBook?.title}
              </Typography>

              {/* אינפוט שם */}
              <Box sx={{ width: '50%', mb: 3 }}>
                <TextField
                  id="input-name"
                  label="שם"
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: {
                      fontSize: '18px',
                    },
                  }}
                />
              </Box>

              {/* דירוג */}
              <Grid item md={6} xs={12} sx={{ padding: "10px" }}>
                <Typography variant="h6">דרג את הספר</Typography>
                <Box className={classes.root}>
                  <Rating
                    name="rating"
                    value={value}
                    onChange={(event, newValue) => setValue(6 - newValue)}
                    onChangeActive={(event, newHover) => setHover(newHover)}
                  />
                  {value !== null && (
                    <Typography sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Typography>
                  )}
                </Box>
              </Grid>

              {/* תיבת תגובה */}
              <Input
                aria-label="input"
                placeholder="הקלד תגובה לספר"
                onChange={(e) => setUserResponse(e.target.value)}
                multiline
                sx={{
                  width: '100%',
                  height: "30vh",
                  fontSize: '18px',
                  padding: '10px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                  overflow: "auto",
                }}
              />
              {/* כפתור */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#1e88e5",
                    color: "white",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  שלח תגובה
                </Button>
              </Box>
            </Box>

          </Modal>
        </Grid>
      </Box>
    </Box>
  );
}
