import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading';
import { Modal } from 'bootstrap';

function ProductModal({ tempProduct, modelRef, addCart, isLoadingBtn }) {
    const productRef = useRef(null);
    const [quantity, setQuantity] = useState(1);


    const getQuantity = (e) => {
        setQuantity(e.target.value);
    }
    //modal控制
    const closeModal = () => {
        modelRef.current.hide()
    }

    useEffect(() => {
        modelRef.current = new Modal(productRef.current, {
            backdrop: false
        })
    }, [])

    const addItem = async() => {
        await addCart(tempProduct.id, quantity);
        setQuantity(1);
        closeModal()
    }
    return (
        <div className="modal" tabIndex="-1" ref={productRef} id="productModal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">產品名稱 : {tempProduct.title}</h5>
                        <button type="button" className="btn-close me-1" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={tempProduct.imageUrl} alt="" width="100%" height="300" className='object-fit-cover text-center' />
                        <p className="mt-3"><span className="fw-bold me-2">內容:</span> {tempProduct.content}</p>
                        <p><span className="fw-bold me-2">描述:</span> {tempProduct.description}</p>
                        <p><span className="fw-bold me-2">價錢:</span> {tempProduct.price} <span className="text-decoration-line-through">{tempProduct.origin_price}</span>元</p>
                        <div className="mb-3 row">
                            <label htmlFor="quantity" className="col-md-2 col-form-label fw-bold me-2">數量: </label>
                            <div className="col-md-10">
                                <select
                                    className="form-select"
                                    id="quantity"
                                    value={quantity}
                                    onChange={getQuantity}>
                                    {[...Array(10)].map((_, i) => (<option value={i + 1} key={i + 1}>{i + 1}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                        className="btn btn-primary d-flex align-items-center gap-2" 
                        disabled={isLoadingBtn}
                        onClick={addItem}><div>加入購物車</div>
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
    )
}

export default ProductModal