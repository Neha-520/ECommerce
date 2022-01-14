import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import './Products.css'
import Pagination from 'react-js-pagination'
// import Slider from '@mui/core'
// import Typography from '@mui/core'

const Products = ({ match }) => {
    const dispatch = useDispatch(getProduct);

    const { loading, products, error, productsCount, resultPerPage } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1);

    const keyword = match.params.keyword

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {

        dispatch(getProduct(keyword, currentPage));

    }, [dispatch, keyword, currentPage])

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
                    {/* <Slider></Slider> */}
                </div>

                {resultPerPage < productsCount && (
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
