import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "3rem",
        marginBottom: "3rem",
        padding: "2rem",
        background: "linear-gradient(145deg, #f5f7fa, #c3cfe2)",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* כותרת ראשית */}
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: "#4A5568",
            fontWeight: "bold",
            borderBottom: "3px solid #9F7AEA",
            display: "inline-block",
            paddingBottom: "0.5rem",
          }}
        >
          מדיניות פרטיות ואבטחה
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          אנו מחויבים לשמור על פרטיותכם ועל מידע אישי שברשותכם.
        </Typography>
      </Box>

      {/* איסוף ושימוש במידע */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: "8px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#6B46C1", fontWeight: "bold" }}
        >
          איסוף ושימוש במידע
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography paragraph>
          לצורך מתן שירות מיטבי, אנו אוספים פרטים כגון כתובת דוא"ל ושם המשתמש במהלך ההרשמה. מידע זה לא יימסר לצד שלישי.
        </Typography>
      </Paper>

      {/* אבטחת המידע */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: "8px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#6B46C1", fontWeight: "bold" }}
        >
          אבטחת המידע
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography paragraph>
          האתר עושה שימוש בטכנולוגיות אבטחה מתקדמות לשמירה על המידע שלכם. אנו פועלים בהתאם לתקני אבטחת מידע מקובלים בתעשייה.
        </Typography>
      </Paper>

      {/* כללי השימוש באתר */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: "8px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#6B46C1", fontWeight: "bold" }}
        >
          כללי השימוש באתר
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem
            sx={{
              textAlign: "right",
              borderBottom: "1px solid #E2E8F0",
              py: 2,
            }}
          >
            <ListItemText
              primary="שימוש הוגן"
              secondary="חל איסור להעלות תוכן פוגעני או בלתי הולם לאתר."
              primaryTypographyProps={{
                sx: { fontWeight: "bold", color: "#2D3748" },
              }}
            />
          </ListItem>
          <ListItem
            sx={{
              textAlign: "right",
              borderBottom: "1px solid #E2E8F0",
              py: 2,
            }}
          >
            <ListItemText
              primary="שמירה על פרטיות"
              secondary="כל המידע שתמסרו במהלך השימוש באתר ישמר תחת תנאי סודיות מחמירים."
              primaryTypographyProps={{
                sx: { fontWeight: "bold", color: "#2D3748" },
              }}
            />
          </ListItem>
          <ListItem sx={{ textAlign: "right", py: 2 }}>
            <ListItemText
              primary="כתיבת ספר בהמשכים"
              secondary="הכתיבה חייבת להיות בהתאם לכללי האתר ולשמור על כבוד המשתמשים האחרים."
              primaryTypographyProps={{
                sx: { fontWeight: "bold", color: "#2D3748" },
              }}
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}
