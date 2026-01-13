import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../slices/userSlice";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";


export default function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isConnected, loading, error } = useSelector(
    (state) => state.user
  );

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setErrorMessage("");

    if (!userName || !userPassword) {
      setErrorMessage("אלו שדות חובה!");
      return;
    }

    const newUser = { name: userName, password: userPassword };
    console.log("user login:", newUser);

    try {
      await dispatch(login(newUser)).unwrap(); 
      navigate("/HomePage");          
    } catch (err) {
      setErrorMessage("שם משתמש או סיסמה שגויים");
    }
  };

  useEffect(() => {
    if (error) {
      setUserPassword("");
    }
  }, [error]);


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

          <Typography variant="h5" sx={{ mb: 2, textAlign: "center", marginBottom: "5vh" }}>
            התחברות
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="שם משתמש"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            {(errorMessage || error) && (
              <Typography
                color="error"
                variant="body2"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                {errorMessage || error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mb: 2 }}>
              {loading ? "מתחבר..." : "התחבר"}
            </Button>
            <Typography variant="body2" textAlign="center">
              אין לך חשבון? <Link to="/signup">הרשמה</Link>
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
