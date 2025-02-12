import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'
import ReactLoading from 'react-loading';
import Input from "../components/Input";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


function Cart() {
    const [cartList, setCartList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            name: '',
            tel: '',
            address: '',
            message: ''
        },
        mode: 'onTouched'
    }
    )


    const onSubmit = handleSubmit((data) => {
        const { message, ...user } = data;
        const userInfo = {
            data: {
                user,
                message
            }
        }
        placeOrder(userInfo);

    })

    //送出訂單
    const placeOrder = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`${baseUrl}/v2/api/${apiPath}/order`, data)
            alert('結帳成功');
            reset();
            getCartList()
        } catch (error) {
            alert('結帳失敗' || error.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const getCartList = async () => {
        try {
            const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/cart`);
            setCartList(res.data.data);
        } catch (error) {
            alert(error.data)
        }
    }
    useEffect(() => {
        getCartList()
    }, [])

    //清空購物車
    const removeCart = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`${baseUrl}/v2/api/${apiPath}/carts`)
            alert('清空購物車成功');
            getCartList()
        } catch (error) {
            alert('清空購物車失敗' || error.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    //刪除單一商品
    const removeCartItem = async (id) => {
        setIsLoading(true);
        try {
            await axios.delete(`${baseUrl}/v2/api/${apiPath}/cart/${id}`)
            getCartList()
        } catch (error) {
            alert('刪除品項失敗' || error.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    //更新商品數量
    const updateCartItem = async (id, product_id, quantity) => {
        setIsLoading(true);
        try {
            await axios.put(`${baseUrl}/v2/api/${apiPath}/cart/${id}`, {
                data: {
                    product_id,
                    qty: Number(quantity)
                }
            })
            getCartList()
        } catch (error) {
            alert('更新品項失敗' || error.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (<>
        {cartList.carts?.length > 0 ? (<div>
            <div className="text-end py-3 col-12">
                <button className="btn btn-outline-danger" type="button" onClick={removeCart}>
                    清空購物車
                </button>
            </div>
            <div className="card mb-3 mt-lg-7 mt-7">
                {cartList.carts?.map((item) => {
                    return (<div className="row g-0" key={item.id}>
                        <div className="col-3 p-lg-5 p-0">
                            <img src={item.product.imageUrl} className="object-fit-cover rounded mb-4 mb-lg-0"
                                alt={item.product.title} width="100%" height="150px" />
                        </div>
                        <div className="col-9 p-lg-5 p-0">
                            <ul className="list-unstyled d-lg-flex justify-content-between mb-0 h-100">
                                <li className="d-lg-flex w-75">
                                    <div className="card-body d-flex flex-column justify-content-between mb-4 mb-lg-0">
                                        <div className="d-flex justify-content-between">
                                            <h4 className="card-title text-primary fs-6 fs-lg-4 mb-1 mb-lg-2">{item.product.title}</h4>
                                            <button className="d-lg-none" onClick={() => removeCartItem(item.id)}><span
                                                className="material-symbols-outlined fs-5 text-primary">delete</span></button>
                                        </div>
                                        <p className="card-text fs-7 fs-lg-6">{item.product.description}</p>
                                    </div>
                                    <div className="d-flex">
                                        <div className="d-flex align-items-center">
                                            <div className="btn-group me-2" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark btn-sm"
                                                    onClick={() => updateCartItem(item.id, item.product_id, item.qty - 1)}
                                                    disabled={item.qty === 1}
                                                >
                                                    -
                                                </button>
                                                <span
                                                    className="btn border border-dark"
                                                    style={{ width: "50px", cursor: "auto" }}
                                                >{item.qty}</span>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark btn-sm"
                                                    onClick={() => updateCartItem(item.id, item.product_id, item.qty + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="input-group-text bg-transparent border-0">
                                                {item.product.unit}
                                            </span>
                                        </div>
                                        <div className="card-body d-lg-none d-flex flex-column justify-content-end">
                                            <h2 className="text-accent fs-6 en-font text-end">{item.product.price}</h2>
                                            <p
                                                className="text-decoration-line-through text-gray fs-7 fw-normal en-font text-end">
                                                {item.product.origin_price}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-lg-flex align-items-center d-none d-lg-block">
                                    <div className="card-body me-5">
                                        <h2 className="text-accent fs-5 fs-lg-4 en-font me-2">NT${item.product.price}</h2>
                                        <p
                                            className="text-decoration-line-through text-gray fs-7 fs-lg-6 fw-normal en-font text-center">
                                            NT${item.product.origin_price}</p>
                                    </div>
                                    <button className="btn me-3"><span
                                        className="material-symbols-outlined fs-lg-3 text-primary" onClick={() => removeCartItem(item.id)}>delete</span></button>
                                </li>
                            </ul>
                        </div>
                    </div>)
                })}
                <div className="card-footer py-3 fs-5 bg-secondary">
                    <div className="d-flex justify-content-end my-3 align-items-center">
                        <div className="text-primary">總計：</div>
                        <div className="btn btn-white text-nowrap fw-bold fs-5" style={{ width: "200px" }}>{`NT$${cartList.total}`}</div>
                    </div>
                </div>
            </div>

            <div className="row my-5">
                <div className="col-6 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            register={register}
                            errors={errors}
                            id='email'
                            labelText='Email'
                            type='email'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Email為必填'
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
                            id='name'
                            labelText='收件人姓名'
                            type='text'
                            rules={{
                                required: {
                                    value: true,
                                    message: '收件人姓名為必填'
                                },
                                minLength: {
                                    value: 2,
                                    message: '收件人姓名至少兩個字'
                                }
                            }}
                        />
                        <Input
                            register={register}
                            errors={errors}
                            id='tel'
                            labelText='收件人電話'
                            type='tel'
                            rules={{
                                required: {
                                    value: true,
                                    message: '收件人電話為必填'
                                },
                                minLength: {
                                    value: 8,
                                    message: '收件人電話至少8碼'
                                },
                                maxLength: {
                                    value: 10,
                                    message: '收件人電話不超過10碼'
                                },
                                pattern: {
                                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                                    message: '格式不正確'
                                }
                            }}
                        />
                        <Input
                            register={register}
                            errors={errors}
                            id='address'
                            labelText='收件人地址'
                            type='text'
                            rules={{
                                required: {
                                    value: true,
                                    message: '收件人地址為必填'
                                }
                            }}
                        />
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">留言</label>
                            <textarea
                                {...register('message')}
                                className="form-control"
                                id="message"
                                rows="5"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-danger d-flex ms-auto px-5" disabled={cartList.length < 1}>送出訂單</button>
                    </form>
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
        </div>) : (<div className="text-center"><h3>購物車是空的</h3></div>)
        }
    </>
    )
}

export default Cart