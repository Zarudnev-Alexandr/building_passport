import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState, useRef } from 'react';



const PassPage = () => {


    return (
        <>
            <Header />
            <div className="ForAds">
                <div className="container">
                    <div className="ForAds__title">
                        <b>Программа «Электронный паспорт здания»</b>
                    </div>
                    <div className="ForAds__inf">
                        <b>Платформа «ЭРА_Универ».</b><br /><br />
                    </div>
                </div>
                <div className="ForAds__block1">
                    <div className="container">
                        <div className="ForAds__block1-describe1">
                            Наличие полной информации об объекте на разных этапах жизненного цикла, а также централизованное хранение этой информации, её автоматизированная обработка   обеспечивается созданием баз данных электронных паспортов зданий.
                        </div>
                    </div>
                </div>
                <div className="ForAds__block2">
                    <div className="container">
                        <div className="ForAds__block2-describe2">
                            Электронный технический паспорт здания  включает  как эксплуатационные, включающие  конструктивные элементы, оборудование, инженерные сети, а также такие энергетические характеристики, как энергоэффективность объекта, способы и виды учета энергоресурсов.
                        </div>
                    </div>
                </div>
                <div className="ForAds__block2">
                    <div className="container">
                        <div className="ForAds__block2-describe2">
                            В состав Орловского Госуниверситета входят 17 учебно-лабораторных корпусов, студенческая поликлиника, 9 общежитий, база отдыха, спортивный комплекс с ассейном.
                            Надлежащее содержание зданий  может быть обеспечено путем постоянного мониторинга технического состояния на основе применяемых  методов его оценки.
                        </div>
                    </div>
                </div>
            </div >
            <Footer />

        </>
    )
}

export default PassPage;