import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deletebook, setSelectedBook } from "../slices/bookSlice";

export default function Search() {
  const bookList = useSelector((state) => state.book.bookListSearch || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeUser = localStorage.getItem("user");
  const user = JSON.parse(storeUser);

  const handleBook = (book) => {
    dispatch(setSelectedBook(book));
    navigate("/PresentBook");
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await dispatch(deletebook(bookId));
      if (response.meta.requestStatus === "fulfilled") {
      dispatch(removeBookFromList(bookId));
    }
    } catch (err) {
      console.error(err);
    }
  };

  const { bookListTitle = [], bookListAuthor = [] } = bookList;

  const renderBookSection = (title, books) => (
    <>
      <Box
        sx={{
          width: "100%",
          marginBottom: "1rem",
          textAlign: "center",
          borderBottom: "3px solid black",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ marginTop: "4vh" }}>
        {books.map((book) => (
          <Grid item xs={4} sm={6} md={3} key={book.id}>
            <BookCard
              book={book}
              handleBook={handleBook}
              handleDeleteBook={handleDeleteBook}
              user={user}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Box sx={{ padding: "4rem" }}>
    <Grid container spacing={4} justifyContent="center" sx={{ width: "80vw", paddingBottom: "8vh", paddingTop: "4vh" }}>
      {bookListTitle?.length > 0 && renderBookSection("ספרים לפי כותרת", bookListTitle)}
      {bookListAuthor?.length > 0 && renderBookSection("ספרים לפי שם הסופר", bookListAuthor)}
      {bookListTitle?.length === 0 && bookListAuthor.length === 0 && (
        <Typography variant="h5" textAlign="center">אין ספרים תואמים</Typography>
      )}
    </Grid>
  </Box>
  );
}

// קומפוננטה נפרדת לכרטיס ספר
function BookCard({ book, handleBook, handleDeleteBook, user }) {
  return (
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
      <CardMedia
        component="img"
        alt={book.title}
        height="200"
        image={`data: image/png; base64, ${book?.image}`}
        sx={{ objectFit: "cover" }}
      />
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
  );
}
