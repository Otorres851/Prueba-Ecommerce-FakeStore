import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCart, delCart } from '../redux/action/index';




const Cart = () => {
    const state = useSelector((state) => state.handleCart)
    const dispatch = useDispatch()

    const addButton = (product) => {
        dispatch(addCart(product))
    }

    const delButton = (product) => {
        dispatch(delCart(product))
    }


    const cartProducts = (product) => {
        return (
            <div className= "container" key={product.id}>
                <div className="px-4 my-5 bg-light rounded-3">
                    <div className="row justify-content-center">
                            <div className="col-md-4">
                                <img src={product.image} alt={product.title} height="200px" width="180px" />
                            </div>
                            <div className="col-md-4">
                                <h5>{product.title}</h5>
                                <span className="lead fw-bold">
                                    <h6>Cant: <em>{product.qty}</em></h6>  
                                    <h6>Unit Price: <em>${product.price}</em></h6> 
                                </span>
                                <button className="btn btn-outline-dark me-4" 
                                onClick={()=> delButton(product)}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button className="btn btn-outline-dark me-4" 
                                onClick={()=> addButton(product)}>
                                    <i  className="fa fa-plus"></i>
                                </button>
                            </div>

                    </div>
                </div>
            </div>
        );
    }

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        );
    }

    const button = () => {
        let total = 0;
        const productList = (product) => {
            let productTot = product.qty * product.price;
            total = total + productTot;
            return (
                <li className="list-group-item d-flex justify-content-between lh-sm" key={product.id}>
                    <div>
                        <h6 className="my-0">{product.title}</h6>
                    </div>
                    <span className="text-muted">${productTot}</span>
                </li>
            );
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 order-md-last">
                        <ul className="list-group mb-3">
                            {state.map(productList)}
                            
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${total}</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-center py2">
                            <NavLink to="/checkout" className="btn btn-outline-dark ms-2">Proceed To Checkout</NavLink>
                            </li>
                        </ul>

                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartProducts)}
            {state.length !== 0 && button()}
        </>
    )

}

export default Cart;