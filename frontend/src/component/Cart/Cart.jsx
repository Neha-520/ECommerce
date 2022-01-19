import React from 'react';
import './Cart.css'
import CartItemCard from './CartItemCard';
import { useDispatch } from 'react-redux'

const Cart = () => {

    const dispatch = useDispatch();

    const item = {
        productId: "productId",
        price: 200,
        name: "abhi",
        quantity: 1
    }
    return (
        <>
            <div className='cartPage'>
                <div className='cartHeader'>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                <div className='cartContainer'>
                    <CartItemCard item={item} />
                    <div className='cartInput'>
                        <button>-</button>
                        <input readOnly value={item.quantity} type="number" />
                        <button>+</button>
                    </div>
                    <p className="cartSubtotal">
                        {`₹${item.price * item.quantity}`}</p>
                </div>

                <div className="cartGrossProfit">
                    {/* //for template grid */}
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Total</p>
                        {/* <p>{`₹${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                        )}`}</p> */}
                        <p>{`₹600`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button >Check Out</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
