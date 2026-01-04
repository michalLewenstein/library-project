import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdailybook, setSelectedBook } from "../slices/bookSlice";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DailyBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popular, setPopular] = useState(null);
  const dailyBook = useSelector((state)=>state.book.dailyBook||null);

  useEffect(() => {
    dispatch(getdailybook());
  }, []);

  useEffect(()=>{
    setPopular(dailyBook);
  },[dailyBook])

  const handleBook = async (book) => {
    dispatch(setSelectedBook(book));
    navigate("/PresentBook");
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" component="h3" align="center" sx={{ marginBottom: "1.5rem", fontWeight: "bold" }}>
        ההמלצה היומית
      </Typography>

      <Card
      onClick = {()=>  handleBook(popular)}
        sx={{
          maxWidth: "100%",
          margin: "0 auto",
          display: "flex",
          height: {xs: "20%", md:"50vh"},
          flexDirection: { xs: "column", sm: "row" },
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {/* Book Image */}
        <CardMedia
          component="img"
          alt={popular?.title}
          image={`data: image/png; base64, ${popular?.image}`}
          onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.png'; }}
          sx={{
            width: { xs: "100%", sm: "40%" },
            height: "auto",
            objectFit: "cover",
            alignItems: 'center'
          }}
        />

        {/* Book Details */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            כותרת: {popular?.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: "1rem" }}>
            <strong>תקציר:</strong> {popular?.summary || "לא זמין"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
            <strong>קל/כבד:</strong> {popular?.lightOrHeavy || "לא זמין"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
            <strong>למה כן:</strong> {popular?.whyYes || "לא זמין"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
            <strong>למה לא:</strong> {popular?.whyNo || "לא זמין"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
