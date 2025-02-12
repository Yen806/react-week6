import { NavLink } from "react-router-dom";

function Navbar() {
    return (<>
        <header className="navbar navbar-expand-lg p-0 bg-white">
            <div className="container-fluid py-4 px-3">
                <NavLink className="navbar-brand" to='/'>
                    <img src="https://raw.githubusercontent.com/ChangYuan-Fresh/FirstProject/refs/heads/gh-pages/assets/LOGO-L-142eb0ee.png" alt="LOGO" />
                </NavLink>
                <NavLink className="fs-2 text-primary ms-auto me-3 d-lg-none" to='cart'>
                    <span className="material-symbols-outlined">shopping_cart</span>
                </NavLink>
                <button
                    className="navbar-toggler border-0 p-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto mt-5 mt-lg-0">
                        <NavLink className="nav-link active text-center py-6 py-lg-0 px-lg-6 border-fix" to='about'>
                            <p className="fs-5 fs-lg-5 fs-xl-4 text-nowrap">關於我們</p>
                            <p className="small fw-normal en-font">About us</p>
                        </NavLink>
                        <NavLink className="nav-link text-center py-6 py-lg-0 px-lg-6 border-fix" to='stories'>
                            <p className="fs-5 fs-lg-5 fs-xl-4 text-nowrap">產地故事</p>
                            <p className="small fw-normal en-font">Our Story</p>
                        </NavLink>
                        <NavLink className="nav-link text-center py-6 py-lg-0 px-lg-6 border-fix" to='products'>
                            <p className="fs-5 fs-lg-5 fs-xl-4 text-nowrap">全部商品</p>
                            <p className="small fw-normal en-font">Store</p>
                        </NavLink>
                        <NavLink className="nav-link text-center py-6 py-lg-0 px-lg-6" to='faq'>
                            <p className="fs-5 fs-lg-5 fs-xl-4 text-nowrap">常見問題</p>
                            <p className="small fw-normal en-font">FAQ</p>
                        </NavLink>
                        <NavLink className="btn btn-s d-none d-lg-inline-block p-0 border-0 mx-6" to='cart'>
                            <span className="material-symbols-outlined p-4 fs-2"
                            >shopping_cart</span>
                        </NavLink>
                        <NavLink className="btn btn-s d-none d-lg-inline-block p-0 border-0" to='login'>
                            <span className="material-symbols-outlined p-4 fs-2">person</span>
                        </NavLink>
                        <div className="d-lg-none">
                            <NavLink className="nav-link py-6 link-primary text-center py-6" to='/login'>
                                <p className="fs-5 fs-lg-4">登入</p>
                                <p className="small fw-normal en-font">Sign in</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>)
}

export default Navbar;