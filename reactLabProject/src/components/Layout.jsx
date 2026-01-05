import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import { Toolbar } from "@mui/material";
import "../styles/Layout.css"

export default function Layout() {
    return (
        <div className="layout">
            <NavBar />

            <Toolbar />

            <main className="layout-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
