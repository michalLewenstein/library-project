import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import { Box, Typography, TextField, Button, Grid } from "@mui/material";


export default function LoginPage() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userPassword) {
      alert("אלו שדות חובה!");
      return;
    }

    const newUser = { name: userName, password: userPassword };

    try {
      const response = await dispatch(login(newUser));

      if (login.fulfilled.match(response)) {
        navigate("/HomePage");
      } else if (login.rejected.match(response)) {
        const error = response.payload?.status;
        if (error === 404) {
          alert("השם משתמש לא קיים במערכת");
          setUserName("");
        } else if (error === 409) {
          alert("הסיסמה לא נכונה!!!!!");
          setUserPassword("");
        }
      }
    } catch (err) {
      alert("אירעה שגיאה במערכת. נסה שוב מאוחר יותר!");
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      

      {/* Form Section */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            padding: 4,
            
            
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center",marginBottom:"5vh" }}>
            התחברות
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="שם משתמש"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2,marginBottom:"3vh" }}
            />
            <TextField
              fullWidth
              label="סיסמה"
              type="password"
              variant="outlined"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              sx={{ mb: 2 ,marginBottom:"3vh" }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              התחבר
            </Button>
            <Typography variant="body2" textAlign="center">
              אין לך חשבון? <a href="/signup">הרשמה</a>
            </Typography>
          </Box>
        </Box>
      </Grid>
      {/* Image Section */}
      <Grid
        item
        
        md={8}
        sx={{
          backgroundImage: "url('/images/book2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100vw",
          display: { xs: "none", md: "block" }, // Hide on small screens
        }}
      />
    </Grid>
  );
}
