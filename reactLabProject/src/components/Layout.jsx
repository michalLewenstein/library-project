import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh", // תופס את כל הדף
            }}
        >
            {/* החלק העליון */}
            <div
                style={{
                    flex: "0 0 11%", // 15% גובה
                    // backgroundColor: "#ffcccc", // צבע רקע לבדיקה
                }}
            >
                <NavBar />
            </div>

            {/* החלק המרכזי */}
            <div
                style={{
                    flex: "1 1 60%", // 50% גובה
                    backgroundColor: "white", // צבע רקע לבדיקה
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Outlet />
            </div>

            {/* החלק התחתון */}
            <div
                style={{
                    flex: "0 0 34%", // 35% גובה
                    backgroundColor: "#1e88e5", // צבע רקע לבדיקה
                }}
            >
                
                <Footer />
            </div>
        </div>
    );
}
