import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {

  const linkStyle = {
    textDecoration: "none",
    color: "#1e88e5",
    fontWeight: 500,
  };

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#f5f7fa",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, md: 6 },
          py: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} textAlign="center">
            <h3>👨‍💻 שירות לקוחות</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>יש לכם שאלות? נשמח לעזור!</li>
              <li>lmichal2024@gmail.com</li>
              <li>טלפון: 058-3230290</li>
              <li>א'-ה' 09:00–17:00</li>
            </ul>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <h3>😉 המלצה היומית</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>צוות הספרייה ממליץ על ספר:</li>
              <li>
                <Link to="/DailyBook" style={{ color: "#1e88e5", fontWeight: 600 }}>
                  לחץ כדי לגלות →
                </Link>
              </li>
              <li>התחל את היום עם קריאה מעוררת השראה!</li>
            </ul>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <h3>👌 קישורים חשובים</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Link to="/HomePage" style={linkStyle}>דף הבית</Link></li>
              <li><Link to="/Chapter" style={linkStyle}>כתיבת ספר בהמשכים</Link></li>
              <li><Link to="/AboutUs" style={linkStyle}>אודות</Link></li>
              <li><Link to="/PrivacyPolicy" style={linkStyle}>מדיניות ופרטיות</Link></li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
