import React from 'react';
import "./main.css"
import "./css/footer.css"
import {Link} from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-left">
                    <span className="footer-copyright">
                        &copy; {currentYear} PoliticalRadar
                    </span>
                </div>

                <div className="footer-links">
                    <a href="#"><Link to={"/"}>홈</Link></a>
                    <a href="#"><Link to={"/analysis"}>분석 리포트</Link></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;