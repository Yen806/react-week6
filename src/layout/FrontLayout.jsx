import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function FrontLayout() {
    return (<>
        <Navbar />
        <div className="container">
            <Outlet />
        </div>
    </>)
}


export default FrontLayout