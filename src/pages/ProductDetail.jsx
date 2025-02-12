import { useState, useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;



function ProductDetail() {
    const [product, setProduct] = useState({});
    const [qtySelect, setQtySelect] = useState(1);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { id: product_id } = useParams();

    const addCartItem = async (product_id, qtySelect) => {
        setIsLoadingBtn(true);
        setIsLoading(true)
        try {
            await axios.post(`${baseUrl}/v2/api/${apiPath}/cart`, {
                data: {
                    product_id,
                    qty: Number(qtySelect)
                }
            })
        } catch (error) {
            alert(error.data.message)
        } finally {
            setIsLoadingBtn(false);
            setIsLoading(false)
            setQtySelect(1)
        }
    }

    const getQuantity = (e) => {
        setQtySelect(e.target.value);
    }

    const getProductDetail = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/product/${product_id}`);
            setProduct(res.data.product);
        } catch (error) {
            alert('取得資料失敗' || error.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getProductDetail();
    }, [])

    return (<>
        <main className="position-relative mb-lg-8 mb-0 mt-lg-7">
            <div className="row gx-lg-5">
                <div className="col-lg-5">
                    <img src={product.imageUrl} alt={product.title} height="400px" width="100%" className="object-fit-cover border rounded" />
                </div>
                <div className="col-lg-7 d-flex flex-column justify-content-between px-lg-5">
                    <div className="mt-5 mt-lg-0">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-2">
                                <li className="breadcrumb-item fs-7 fs-lg-6 fw-normal">
                                    <NavLink>{product.category}</NavLink>
                                </li>
                                <li className="breadcrumb-item fs-7 fs-lg-6 fw-normal">
                                    <NavLink>{product.title}</NavLink>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="fs-4 fs-lg-2 mb-1">{product.title}</h1>
                        <p className="mb-3 text-gray fw-normal fs-6 fs-lg-5">天然、安全、優質</p>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                aria-labelledby="price1">
                                <div className="d-flex align-items-end">
                                    <h2 className="text-accent fs-5 fs-lg-4 en-font me-2">{`NT$${product.price}`}</h2>
                                    <p
                                        className="text-decoration-line-through text-gray fs-7 fs-lg-6 fw-normal en-font">
                                        {`NT$${product.origin_price}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-primary fs-7 mb-2">{product.description}</p>
                        <div className="mb-5">
                            <div className="d-flex justify-content-between w-25 align-items-center mb-2">
                                <p className="text-primary fs-7">數量</p>
                                <p className="text-gray">{`剩餘 3 ${product.unit}`}</p>

                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <select
                                    className="form-select px-5 w-25"
                                    id="quantity"
                                    value={qtySelect}
                                    onChange={getQuantity}>
                                    {[...Array(10)].map((_, i) => (<option value={i + 1} key={i + 1}>{i + 1}</option>))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-primary w-25 d-flex justify-content-center"
                                    disabled={isLoadingBtn}
                                    onClick={() => addCartItem(product_id, qtySelect)}>
                                    <div className="text-white">加入購物車</div>
                                    {isLoadingBtn && (<ReactLoading
                                        type={"balls"}
                                        color={"white"}
                                        height={"1.5rem"}
                                        width={"1rem"}
                                    />)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        {/* <!-- pc文案 --> */}
        <article className="d-none d-lg-block">
            <nav id="navbar-example2">
                <ul className="list-unstyled d-flex justify-content-between w-100 border-bottom mb-8">
                    <li className="btn text-center w-100 me-5 p-0 border-bottom-transparent border-4">
                        <Link className="py-4 fs-4 text-black">商品介紹</Link>
                    </li>
                    <li className="btn text-center w-100 me-5 p-0 border-bottom-transparent border-4">
                        <Link className="py-4 fs-4 text-black">規格說明</Link>
                    </li>
                    <li className="btn text-center w-100 p-0 border-bottom-transparent border-4">
                        <Link className="py-4 fs-4 text-black">評論</Link>
                    </li>
                </ul>
            </nav>
            <div className="w-50 mx-auto pt-8">
                <div>
                    <p className="mb-5" >
                        {product.content}
                    </p>
                    {product.imagesUrl?.map((img) => (<div key={img} className="text-center mb-5"><img src={img} alt="" className="mb-3 border rounded object-fit-cover" width='100%' height="400px" /></div>))}
                </div>
                <ul className="list-unstyled">
                    <li className="mb-8">
                        <h2>產品規格</h2>
                        <p>{product.description}</p>
                    </li>
                    <li className="mb-8">
                        <h2>保存方法</h2>
                        <p>收到後冷凍保存,解凍後請盡快食用，請勿重複冷凍</p>
                    </li>
                    <li className="mb-8">
                        <h2>滿額免運原則</h2>
                        <ol>
                            <li>
                                全館商品滿 $1000 (含及以上)即享免運服務
                            </li>
                            <li>
                                訂單含冷凍商品時，僅提供宅配服務
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
        </article>
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
    </>
    )
}

export default ProductDetail;