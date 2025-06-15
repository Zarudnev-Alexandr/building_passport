import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useState } from "react";
import s1 from '../images/s1.png';




const RulesPage = () => {


    return (
        <>
            <Header />
            <h1 className="RulesPage__Title">Авторские права</h1>
            <div className="RulesPage__ForCenter">
                    <img src={s1} alt="Photo 1" />
           
            </div>
            <Footer />
        </>
    )
}

export default RulesPage;