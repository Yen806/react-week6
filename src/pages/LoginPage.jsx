import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactLoading from 'react-loading'
import axios from 'axios'
import Input from "../components/Input";


const baseUrl = import.meta.env.VITE_BASE_URL;

function LoginPage() {
    const nevigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/v2/admin/signin`, data);
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            axios.defaults.headers.common['Authorization'] = token;
            nevigate("/admin")
        } catch (error) {
            alert(error.data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card border-0 mx-auto my-lg-11 my-7 col-lg-6">
                    <div className="card-body mb-5">
                        <h1 className="card-title fs-2 text-center text-primary mb-11">會員登入</h1>
                        <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                register={register}
                                errors={errors}
                                id='username'
                                labelText='帳號'
                                type='text'
                                rules={{
                                    required: {
                                        value: true,
                                        message: '帳號為必填'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: '格式不正確'
                                    }
                                }}
                            />
                            <Input
                                register={register}
                                errors={errors}
                                id='password'
                                labelText='密碼'
                                type='password'
                                rules={{
                                    required: {
                                        value: true,
                                        message: '密碼為必填'
                                    }
                                }}
                            />
                            <button type='submit' className="btn btn-L btn-primary text-white py-3 mb-5 mx-auto w-50">登入</button>
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">

                        <Link className="card-link me-7 link-primary">忘記密碼?</Link>
                        <Link className="card-link link-primary">註冊會員</Link>
                    </div>
                </div>
            </div>

            {isLoading && (<div
                className="d-flex justify-content-center align-items-center"
                style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    zIndex: 999,
                }}
            >
                <ReactLoading type="balls" color="pink" width="4rem" height="4rem" />
            </div>)}
        </div >

    )
}
export default LoginPage;