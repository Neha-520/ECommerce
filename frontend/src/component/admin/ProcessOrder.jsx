import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Sidebar from "./Sidebar";
import {
    getOrderDetails, clearErrors,
    updateOrder
} from '../../actions/orderActions'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";



const ProcessOrder = ({ history, match }) => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    )

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {

        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment")
    }

    return (
        <>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <div className='confirmOrderPage'>
                        <div>
                            <div className='confirmShippingArea'>
                                <Typography>Shipping Info</Typography>
                                <div className='confirmShippingAreaBox'>
                                    <div>
                                        <p>Name:</p>
                                        <span>{user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='confirmCartItems'>
                                <Typography>Your Cart Items:</Typography>
                                <div className='confirmCartItemsContainer'>
                                    {cartItems && cartItems.map((item, i) => (
                                        <div key={i}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.productId}`}>
                                                {item.name}
                                            </Link>
                                            <span>
                                                {item.quantity} X ₹{item.price} = {" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='orderSummary'>
                                <Typography>Order Summary</Typography>
                                <div>
                                    <div>
                                        <p>Subtotal:</p>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div>
                                        <p>Shipping Charges:</p>
                                        <span>₹{shippingCharges}</span>
                                    </div>
                                    <div>
                                        <p>GST:</p>
                                        <span>₹{tax}</span>
                                    </div>
                                </div>

                                <div className="orderSummaryTotal">
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>₹{totalPrice}</span>
                                </div>

                                <button onClick={proceedToPayment}>Proceed To Payment</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcessOrder;
