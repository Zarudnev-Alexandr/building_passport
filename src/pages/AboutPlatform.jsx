import { NavLink } from "react-router-dom";
import React from "react";
import Footer from "../components/Footer";
import modelPhoto from '../images/1.jpg'

const AboutPlatform = () => {
    localStorage.setItem('last_page', '/');
    return (
        <>
            <section className="Platform__functional">
                <div className="container">
                    <div className="Platform__functional-inner">
                        <h1 className="Platform__functional-title">Модель информационного взаимодействия</h1>
                        <div className="Platform__diagram-container">
                            <img src={modelPhoto} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default AboutPlatform;