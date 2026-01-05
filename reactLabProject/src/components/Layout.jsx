import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import "../styles/Layout.css"

export default function Layout() {
    return (
        <div className="layout">
            <NavBar />

            <main className="layout-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
