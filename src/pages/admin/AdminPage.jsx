import { NavLink, Outlet } from "react-router-dom";

function AdminPage() {
    return (
        <>
            <header className="navbar navbar-expand-lg p-0 bg-white">
                <div className="container-fluid py-4 px-3">
                    <NavLink className="navbar-brand" to='/'>
                        <img src="https://raw.githubusercontent.com/ChangYuan-Fresh/FirstProject/refs/heads/gh-pages/assets/LOGO-L-142eb0ee.png" alt="LOGO" />
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto mt-5 mt-lg-0 align-middle">
                            <NavLink className="nav-link text-center py-6 py-lg-0 px-lg-6 border-0" to='product'>
                                <p className="fs-5 fs-lg-5 fs-xl-4 text-nowrap">管理中心</p>
                            </NavLink>
                            <NavLink className="nav-link text-center p-0 border-0" to='product'>
                                <span className="material-symbols-outlined p-0 fs-2 me-3">manage_accounts</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <Outlet />
            </div>
        </>


    )
}
export default AdminPage;