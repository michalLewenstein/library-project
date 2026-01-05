import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on large
        alignItems: "center",
        justifyContent: "space-between",
        width: "100vw",
        color: "white",
        margin: 0,
        padding: { xs: "10px", md: "20px" }, // Adjust padding for smaller screens
        boxSizing: "border-box",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.8)",
        gap: { xs: "10px", md: "0px" }, // Add spacing between items on smaller screens
        flexWrap: "wrap", // Allow items to wrap when space is limited
      }}
    >
      {/* שירות לקוחות */}
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          textAlign: "center",
          borderBottom: { xs: "3px solid #ccc", md: "none" }, // Separator for small screens
          padding: "10px",
        }}
      >
        <h3 style={{ fontWeight: "bold", textDecoration: "underline" }}>
          👨‍💻 שירות לקוחות 👨‍💻
        </h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
          <li>יש לכם שאלות? נשמח לעזור!</li>
          <li>lmichal2024@gmail.com</li>
          <li>טלפון: 058-3230290</li>
          <li>שעות פעילות: א'-ה' 09:00-17:00</li>
        </ul>
      </Grid>

      {/* המלצה היומית */}
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          textAlign: "center",
          borderBottom: { xs: "3px solid #ccc", md: "none" }, // Separator for small screens
          padding: "10px",
          borderRight: { md: "4px solid #ccc", xs: "none" }, // Divider for larger screens
        }}
      >
        <h3 style={{ fontWeight: "bold", textDecoration: "underline" }}>
          😉 המלצה היומית 😉
        </h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
          <li>
            צוות הספרייה ממליץ על ספר:
            <a href="/DailyBook" style={{ color: "white" }}>
              לחץ כדי לגלות
            </a>
          </li>
          <li>התחל את היום עם קריאה מעוררת השראה!</li>
        </ul>
      </Grid>

      {/* קישורים חשובים */}
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          textAlign: "center",
          padding: "10px",
          borderRight: { md: "4px solid #ccc", xs: "none" }, // Divider for larger screens
        }}
      >
        <h3 style={{ fontWeight: "bold", textDecoration: "underline" }}>
          👌 קישורים חשובים 👌
        </h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
          <li>
            <a
              href="/HomePage"
              style={{ textDecoration: "none", color: "white" }}
            >
              דף הבית
            </a>
          </li>
          <li>
            <a
              href="/Chapter"
              style={{ textDecoration: "none", color: "white" }}
            >
              כתיבת ספר בהמשכים
            </a>
          </li>
          <li>
            <a
              href="/AboutUs"
              style={{ textDecoration: "none", color: "white" }}
            >
              אודות
            </a>
          </li>
          <li>
            <a
              href="/PrivacyPolicy"
              style={{ textDecoration: "none", color: "white" }}
            >
              מדיניות ופרטיות
            </a>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
}
