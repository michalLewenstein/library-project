import { Outlet } from "react-router-dom";

export default function NoNavLayout() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", 
                backgroundColor: "white", 
            }}
        >
            <Outlet/> 
        </div>
    );
}
