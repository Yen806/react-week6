import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="row">
            <div className="card border-0 mx-auto my-lg-11 my-7 col-lg-6">
                <div className="card-body mb-5">
                    <h1 className="card-title fs-2 text-center text-primary mb-11">會員登入</h1>
                    <div className="mb-5">
                        <label htmlFor="account" className="form-label fs-5">帳號</label>
                        <input type="text" className="form-control bg-white" id="account"
                            placeholder="asd456@gmail.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label fs-5">密碼</label>
                        <input type="password" className="form-control bg-white" id="password" placeholder="0987654321" />
                    </div>
                </div>
                <Link className="card-link btn btn-L py-3 mb-5 mx-auto w-50">登入</Link>
                <div className="d-flex justify-content-center">
                    <Link className="card-link me-7 link-primary">忘記密碼?</Link>
                    <Link className="card-link link-primary">註冊會員</Link>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;