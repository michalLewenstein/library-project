import React from "react";
import { Outlet } from "react-router-dom";
import Login from '../components/Login'

export default function NoNavLayout() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // תופס את כל הגובה
                backgroundColor: "white", // צבע רקע לבדיקה
            }}
        >
            <Outlet/>
        </div>
    );
}
