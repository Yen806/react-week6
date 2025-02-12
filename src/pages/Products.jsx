import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const getProductList = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/products`);
            setProducts(res.data.products);
        } catch (error) {
            alert('取得資料失敗' || error.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    const addCartItem = async (id, quantity) => {
        setIsLoadingBtn(true);
        try {
            await axios.post(`${baseUrl}/v2/api/${apiPath}/cart`, {
                data: {
                    product_id: id,
                    qty: Number(quantity)
                }
            })

        } catch (error) {
            alert('加入購物車失敗' || error.data.message)
        } finally {
            setIsLoadingBtn(false)
        }
    }
    useEffect(() => {
        getProductList();
    }, [])
    
    return (<>
        <div className="row">
            <div className="col-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" width="25%">圖片</th>
                            <th scope="col" width="25%">產品名稱</th>
                            <th scope="col" width="15%">價格</th>
                            <th scope="col" width="35%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.id} className="align-middle">
                                    <th scope="row"><img src={product.imageUrl} alt="" width="180" height="100" className='object-fit-cover border rounded' /></th>
                                    <td>{product.title}</td>
                                    <td>
                                        <div>
                                            <p className='text-decoration-line-through my-1'>{product.origin_price}</p>
                                            <p className="my-1">{product.price}</p>
                                        </div></td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <Link className="btn btn-outline-primary btn-sm" to={`/products/${product.id}`}>查看更多</Link>
                                            <button type="button" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2" disabled={isLoadingBtn} onClick={() => addCartItem(product.id, 1)}><div>加到購物車</div>
                                                {isLoadingBtn && (<ReactLoading
                                                    type={"balls"}
                                                    color={"white"}
                                                    height={"1.5rem"}
                                                    width={"1rem"}
                                                />)}</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
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
    </>
    )
}
export default Products;