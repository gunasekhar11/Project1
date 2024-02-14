import React from 'react';
import {BsFacebook,BsLinkedin,BsInstagram,BsTwitter,BsPinterest,BsYoutube} from 'react-icons/bs'
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='contact-us'>
            <h2 style={{fontWeight:"bold"}}>Follow Us</h2>
        </div>
        <div className='social-media-icons'>
            <BsFacebook className='icons'/>
            <BsLinkedin className='icons'/>
            <BsInstagram className='icons'/>
            <BsTwitter className='icons'/>
            <BsPinterest className='icons'/>
            <BsYoutube className='icons'/>
        </div>
        {/* <div className='links'>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Team</li>
                <li>Contact Us</li>
            </ul>
        </div> */}
        <div className='copyright'>
            <p>Copyright @2023 Maang. Designed by Maang</p>
        </div>
    </div>
  );
}

export default Footer;
