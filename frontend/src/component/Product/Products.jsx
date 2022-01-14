import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import './Products.css'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';

const categories = [
    "camera",
    "OfficeTable",
    "Tops",
    "StudyTable",
    "Mattress",
    "Bedsheet",
    "Coat",
    "Blazers"
];

const Products = ({ match }) => {

    const dispatch = useDispatch(getProduct, clearErrors);
    const alert = useAlert();

    const { loading,
        products,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")

    const keyword = match.params.keyword

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category));

    }, [dispatch, keyword, currentPage, price, category])

    let count = filteredProductsCount;

    return (
        <>
            {loading ? <Loader /> : (<>
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {
                        products && products.map((p, i) => (
                            <ProductCard key={i} product={p} />
                        ))
                    }
                </div>

                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                    ></Slider>

                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category, i) => (
                            <li className='category-link' key={i}
                                onClick={() => setCategory(category)} >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                    </fieldset>
                </div>


                {resultPerPage < count && (
                    <div className='paginationBox'>
                        {/* //default class pagination */}
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass='page-item'
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            activeLinkClass="pageLinkActive"
                        ></Pagination>
                    </div>
                )}
            </>)}
        </>
    )
}

export default Products
