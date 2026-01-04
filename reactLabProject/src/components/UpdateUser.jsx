import React, { useEffect, useState } from "react";
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../slices/userSlice";

export default function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const storeUser = localStorage.getItem("user");
    // let user = '';
    const user = useSelector((state)=>state.userDetails.user||null);
    const [userId, setUserId] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // if(storeUser){
        //     user = JSON.parse(storeUser);
        //     user = user.data;
        //             }
        // console.log("עדכון ממשתמש: ", user);
        if (user) {
              
            const userName = user.name.split(" ");//מערך לפי רווחים
            //אם יש רק שם פרטי
            if (userName.length === 1) {
                setUserFirstName(userName[0]);
                setUserLastName("");

            }
            else {
                setUserLastName(userName.pop() || " ");//מכניס איבר אחרון
                setUserFirstName(userName.join(" ") || " ");
                
            }
            setUserId(user.id);
            setUserPassword(user.password || "");
            setUserEmail(user.email || "");
        }

    }, [user])


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
            id:userId,
            name: userLastName? `${userFirstName} ${userLastName}` : userFirstName,
            password: userPassword,
            email: userEmail,
        };
        console.log("newUser=============:", newUser);
        
        try {
            const response = await dispatch(update(newUser));
            console.log(response);
            } catch (error) {
              navigate("/Login");
            }

    };

    return (
        <Grid container style={{ height: "100vh" }}>
            {/* Form Section */}
            <Grid
                item
                xs={12}
                md={12}
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
                        עדכון
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
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={6}
                                sx={{ mb: 2, marginBottom: "3vh" }}
                            >
                               
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            עדכן
                        </Button>

                    </Box>
                </Box>

            </Grid>

        </Grid>
    );
}