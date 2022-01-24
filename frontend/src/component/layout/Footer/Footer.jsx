import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from '../../../images/Appstore.png'
import './Footer.css'

export const Footer = () => {
    return (
        <footer id="footer">
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt='playstore' />
                <img src={appStore} alt='Appstore' />
            </div>

            <div className='midFooter'>
                <h1>BlueMart</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; Neha</p>
            </div>

            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href="https://www.instagram.com/neha._.garg._">Instagram</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="https://mtouch.facebook.com">Facebook</a>
            </div>
        </footer>
    )
}
