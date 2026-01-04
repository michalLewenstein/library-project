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
  Avatar,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SaveIcon from "@mui/icons-material/Save";

export default function AboutUs() {
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "3rem",
        marginBottom: "3rem",
        padding: "2rem",
        background: "linear-gradient(145deg, #f7f9fc, #dbe7f0)",
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
            color: "#2C5282",
            fontWeight: "bold",
            borderBottom: "3px solid #3182CE",
            display: "inline-block",
            paddingBottom: "0.5rem",
          }}
        >
          אודותינו
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{
            mt: 2,
            color: "#4A5568",
          }}
        >
          ברוכים הבאים לספרייה הדיגיטלית שלנו - חווית קריאה מהנה ומעשירה!
        </Typography>
      </Box>

      {/* מה אנחנו מציעים */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: "8px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#2B6CB0",
            fontWeight: "bold",
          }}
        >
          מה אנחנו מציעים?
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography paragraph>
          הספרייה הדיגיטלית שלנו מאפשרת לכם לקרוא מגוון רחב של ספרים מקטגוריות שונות, לצפות בתקצירים, להגיב על ספרים ולקרוא את הפרק הראשון בכל ספר שתרצו. 
        </Typography>
        <Typography paragraph>
          בנוסף, תוכלו להשתתף בחוויית כתיבה ייחודית - ספר בהמשכים, שבו כל פרק נכתב על ידי משתמש אחר!
        </Typography>
      </Paper>

      {/* תהליך כתיבת ספר בהמשכים */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: "8px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#2B6CB0",
            fontWeight: "bold",
          }}
        >
          איך עובד תהליך כתיבת ספר בהמשכים?
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {/* שלב 1 */}
          <ListItem sx={{ textAlign: "right", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#3182CE",
                marginLeft: "1rem",
              }}
            >
              <MenuBookIcon />
            </Avatar>
            <ListItemText
              primary="1. פתיחת ספר חדש"
              secondary="אם אין אף ספר פתוח, תוכלו לפתוח ספר חדש ולהתחיל לכתוב את הפרק הראשון."
              primaryTypographyProps={{
                sx: { fontWeight: "bold", color: "#2D3748" },
              }}
            />
          </ListItem>

          {/* שלב 2 */}
          <ListItem sx={{ textAlign: "right", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#3182CE",
                marginLeft: "1rem",
              }}
            >
              <CreateIcon />
            </Avatar>
            <ListItemText
              primary="2. כתיבת פרק"
              secondary="בכל זמן, משתמש אחד יכול לכתוב את הפרק הבא. אם משתמש אחר כותב, תוצג הודעה מתאימה."
              primaryTypographyProps={{
                sx: { fontWeight: "bold", color: "#2D3748" },
              }}
            />
          </ListItem>

          {/* שלב 3 */}
          <ListItem sx={{ textAlign: "right" }}>
            <Avatar
              sx={{
                bgcolor: "#3182CE",
                marginLeft: "1rem",
              }}
            >
              <SaveIcon />
            </Avatar>
            <ListItemText
              primary="3. שמירה והמשך"
              secondary="לאחר כתיבת פרק, הספר זמין להמשך הכתיבה על ידי משתמשים אחרים - כך נוצרת חוויית כתיבה שיתופית."
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
