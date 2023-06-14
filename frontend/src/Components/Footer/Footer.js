import React from 'react';
import './footer.css'
import playstore from './../../assets/play-store.png'
import appstore from './../../assets/app-store.png'
const Footer = () => {
    return <div className="footer">
        <div className="container">
            <div className="row">
                <div className="footer-col-1">
                    <h3>Download our App</h3>
                    <p>Dowload app for android and ios mobile phones</p>
                    <div className="app-logo">
                        <img src={playstore} alt="app-store" />
                        <img src={appstore} alt="play-store" />
                    </div>
                </div>
                <div className="footer-col-2">
                    <h3 className="logo">Trexxplore</h3>
                    <p>Discover Extraordinary Adventures Explore the World with Our Unforgettable Tours</p>
                </div>
                <div className="footer-col-3">
                    <h3>Useful links</h3>
                    <ul>
                        <li>home</li>
                        <li>About</li>
                        <li>Tour</li>
                        <li>Login</li>
                    </ul>
                </div>
                <div className="footer-col-4">
                    <h3>Follow us</h3>
                    <ul>
                        <li>Instagram</li>
                        <li>Whatsapp</li>
                        <li>Facebook</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </div>
        </div>
        <hr />
        <p className='copyright'>copyright 2020 - Amaan Ansari</p>
    </div>;
};

export default Footer;
