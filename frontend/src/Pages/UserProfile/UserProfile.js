import React, { useState } from "react";
import './UserProfile.css'
import MySetting from "../../Components/User/MySetting";
import MyBooking from "../../Components/User/MyBooking";
import MyReview from "../../Components/User/MyReview";
import { RiUserSettingsFill } from "react-icons/ri";
import { SiPicartodottv } from "react-icons/si";
import { MdReviews } from "react-icons/md";

const name = {
    SETTINGS: 'SETTINGS',
    BOOKING: 'BOOKING',
    REVIEW: 'REVIEW',
}
const UserProfile = () => {
    const [activePage, setActivePage] = useState(name.SETTINGS)
    const handleClick = (component) => {
        setActivePage(component)
    }

    return (
        <div className="container">

            <div className="user-box">
                <div className="left-bar">
                    <ul>
                        <li onClick={() => handleClick(name.SETTINGS)}>< RiUserSettingsFill /> Settings</li>
                    </ul>
                    <ul>
                        <li onClick={() => handleClick(name.BOOKING)}><SiPicartodottv /> Booking</li>
                    </ul>
                    <ul>
                        <li onClick={() => handleClick(name.REVIEW)}><MdReviews /> Review</li>
                    </ul>

                </div>
                <div className="right-bar">
                    {activePage === name.SETTINGS && <MySetting />}
                    {activePage === name.BOOKING && <MyBooking />}
                    {activePage === name.REVIEW && <MyReview />}
                </div>
            </div>

        </div>
    )
};

export default UserProfile;
