import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io5";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer=()=>{
    return(
        <div className="footer">
            <div className="footer-main">
                <div>
                   <h2>About</h2>
                   <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/">About</a></li>
                      <li><a href="/">Contact</a></li>
                      <li><a href="/">Collaborations</a></li>
                   </ul>
                </div>
                <div>
                   <h2>Services</h2>
                   <ul>
                      <li><a href="">Food delivery</a></li>
                      <li><a href="">Catering</a></li>
                      <li><a href="">Veg and Non-veg</a></li>
                      <li><a href="">Home Delivery</a></li>
                   </ul>
                </div>
                <div>
                   <h2>Areas</h2>
                   <ul>
                      <li><a href="">Hyderbad</a></li>
                      <li><a href="">Banglore</a></li>
                      <li><a href="">Chennai</a></li>
                      <li><a href="">Visakhapatnam</a></li>
                   </ul>
                </div>
                <div>
                <h1><Link to='./about' className="logo">HONEY'S</Link></h1>
                   <div className="social-media">
                     <IoLogoLinkedin className="linkedin" />
                     <FiTwitter className="twitter" />
                     <FaInstagram className="instagram"/>
                     <FaFacebookSquare className="facebook" />
                   </div>
                   <p>VARA PRASAD KANUGULA</p>
                </div>
            </div>
            
        </div>
    )
}
export default Footer;