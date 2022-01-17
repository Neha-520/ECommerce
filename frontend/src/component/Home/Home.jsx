import React, { useEffect } from 'react'
import { CgMouse } from "react-icons/all";
import MetaData from '../layout/MetaData';
import "./Home.css";
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard';

const Home = () => {

    const alert = useAlert();

    const dispatch = useDispatch()
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={"BlueMart"} />
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
                        {products && products.map((product, i) =>
                            <ProductCard key={i} product={product} />
                        )}
                    </div>
                </>
            )}
        </>
    )
}
export default Home