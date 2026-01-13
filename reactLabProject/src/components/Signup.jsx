import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from '../services/userServices'

export default function SignUp() {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userFirstName || !userPassword || !userEmail) {
      setErrorMessage("אלו שדות חובה");
      return;
    }

    if (!userEmail.includes("@")) {
      setErrorMessage("המייל חייב להכיל @!");
      return;
    }

    const signupData = {
      name: userLastName
        ? `${userFirstName} ${userLastName}`
        : userFirstName,
      password: userPassword,
      email: userEmail,
    };

    try {
      await signUpUser(signupData);
      navigate("/login", { state: { fromSignup: true } });
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorMessage("המשתמש כבר קיים במערכת");
      } else {
        setErrorMessage("אירעה שגיאה במערכת");
      }
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
          <Typography
            variant="h5"
            sx={{ mb: 2, textAlign: "center", marginBottom: "5vh" }}
          >
            הרשמה
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}
                sx={{ mb: 2, marginBottom: "3vh" }}
              >
                <TextField
                  fullWidth
                  label="שם פרטי"
                  variant="outlined"
                  value={userFirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
                  sx={{ mb: 2, marginBottom: "0" }}
                />
              </Grid>
              <Grid item xs={6}
                sx={{ mb: 2 }}
              >
                <TextField
                  fullWidth
                  label="שם משפחה"
                  variant="outlined"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="אימייל"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              sx={{ mb: 2, marginBottom: "3vh" }}
            />
            <TextField
              fullWidth
              label="סיסמה"
              type="password"
              variant="outlined"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              sx={{ mb: 2, marginBottom: "3vh" }}
            />
            {errorMessage && (
              <Typography
                color="error"
                variant="body2"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              הירשם
            </Button>
            <Typography variant="body2" textAlign="center">
              כבר יש לך חשבון? <Link to="/login">התחברות</Link>
            </Typography>
          </Box>
        </Box>

      </Grid>
      {/* Image Section */}
      <Grid
        item
        xs={12}
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


