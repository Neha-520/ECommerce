import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel';
import './productDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction';
import match from 'nodemon/lib/monitor/match';

const ProductDetails = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    })
    return (
        <>
            <div className='ProductDetails'>
                <div>
                    <Carousel>
                        {


                        }
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
