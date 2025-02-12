import { Link } from "react-router-dom";

function NotFound (){
    return (
        <>
            <h3>頁面不存在</h3>
            <Link to='/' className="text-accent">回到首頁</Link>
        </>
    )
}
export default NotFound;