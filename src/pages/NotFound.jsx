import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container">
            <h3>頁面不存在</h3>
            <Link to='/' className="text-accent">回到首頁</Link>
        </div>

    )
}
export default NotFound;