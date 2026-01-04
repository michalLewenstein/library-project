import React, { useState } from "react";
  import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
  } from "@mui/material";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { signup } from "../slices/userSlice";
  
  export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userFirstName || !userPassword || !userEmail ) {
        alert("אלו שדות חובה!");
        return;
      } else if (!userEmail.includes("@")) {
        alert("המייל חייב להכיל @!");
        setUserEmail("");
        return;
      }
      const newUser = {
        name:userLastName? `${userFirstName} ${userLastName}`: userFirstName,
        password: userPassword,
        email: userEmail,
      };
      console.log("newUser=============:",newUser);
      
      try {
        const response = await dispatch(signup(newUser));
        console.log(response);
        if(response.payload?.status===201)
           navigate("/LogIn");
        else if (response.payload?.status === 409) {
          alert("השם משתמש כבר קיים במערכת");
          setUserFirstName("");
          setUserLastName("");}
        // if (signup.fulfilled.match(response)) {
        //   navigate("/LogIn");
        // } else if (signup.rejected.match(response)) {
        //   const error = response.payload?.status;
        //   if (error === 409) {
        //     alert("השם משתמש כבר קיים במערכת");
        //     setUserFirstName(" ");
        //     setUserLastName(" ");
        //   }
        // }
      } catch (err){

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
                sx={{ mb: 2}}
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
                כבר יש לך חשבון? <a href="/login">התחברות</a>
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
  

