import React from 'react'
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from './Product';

const product = {
    name: "shirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "$300",
    _id: "neha",
}

const Home = () => {
    return (
        <>
            <div className="banner">
                <p>Welcome to BlueMart</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>
            <div className='container' id="container">
                <Product product={product} />
            </div>
        </>
    )
}
export default Home