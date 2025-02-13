import { Link } from "react-router-dom";


function AdminPage() {
    return (
        <div className="container">
            <h3>歡迎來到管理頁面</h3>
            <Link to='/' className="text-accent">回到首頁</Link>
        </div>

    )
}
export default AdminPage;