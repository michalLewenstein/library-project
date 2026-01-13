import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import { Toolbar } from "@mui/material";
import "../styles/Layout.css"

export default function Layout() {
    const {isConnected, isAuthChecked}  = useSelector((state) => state.user);

    if (!isAuthChecked) {
        return null;
    }
    if (!isConnected) {
        return <Navigate to="/Login" replace />;
    }

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
