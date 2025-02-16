import { NavLink } from "react-router-dom";
import React from "react";
import Footer from "../components/Footer";
import modelPhoto from '../images/1.jpg'

const Main = () => {
    localStorage.setItem('last_page', '/');
    return (
        <>
            <div className='ForJkx'>
                <div className="container">
                    <div className="ForJkx__inner">
                        <h1 className="ForJkx__title1">Платформа  «ЭРА_Универ» -  это современный подход  к решению актуальных задач
                        </h1>
                        <p className="ForJkx__describe">Цифровая платформа  обеспечивает сбор, обработку и хранение необходимой и
                            критически важной информации при реализации полномочий департамента Административно хозяйственной деятельности
                            и инфраструктурного развития университета.
                            Набор сервисов включает необходимый функционал для произволительной работы специализированных служб и подразделений.
                            Обеспечивает оптимальную информационную поддержку для принятия управляющих решений.
                        </p>
                    </div>
                </div>
            </div>
            <section className="ForJkx__textblock-1">
                <div className="container">
                    <h1 className="ForJkx__title">Программные решения</h1>
                    <div className="ForJkx__cards">
                        <div className="ForJkx__card">
                            <div className="ForJkx__card-content">
                                <h1 className="ForJkx__card-content__title">Электронный паспорт здания.</h1>
                                <p className="ForJkx__card-content__descr">Общие технические параметры, характеристики конструктивных элементов, инженерных систем/сетей,  лифтов,  приборов учета.</p>
                            </div>
                            <NavLink className="ForJkx__card-link" to='/'>
                                <input type="button" className="ForJkx__card-btn" value="В разработке" />
                            </NavLink>
                        </div>
                        <div className="ForJkx__card">
                            <div className="ForJkx__card-content">
                                <h1 className="ForJkx__card-content__title">Мониторинг тех.состояния здания и его составляющих -
                                    Программа «Износ»</h1>
                                <p className="ForJkx__card-content__descr">Технические характеристики конструктивных элементов, инженерных сетей (см. техпаспорта зданий, сетей),
                                    изменение их физического износа по результатам сезонных осмотров и проведенных текущих ремонтов, разграничение доступа по полномочиям.</p>
                            </div>
                            <NavLink className="ForJkx__card-link" to='/'>
                                <input type="button" className="ForJkx__card-btn" value="В разработке" />
                            </NavLink>
                        </div>
                        <div className="ForJkx__card">
                            <div className="ForJkx__card-content">
                                <h1 className="ForJkx__card-content__title">Контроль нештатных/аварийных ситуаций на объектах управления/зданиях и сетях – программа «Диспетчер»</h1>
                                <p className="ForJkx__card-content__descr">Прием заявок, передача исполнителям, контроль состояния, электронный журнал нештатных ситуаций и аварийных отключения,
                                    аналитические отчеты, визуализация качественного состояния объектов и участков сетей на электронной карте, разграничение доступа по полномочиям.</p>
                            </div>
                            <NavLink className="ForJkx__card-link" to='/'>
                                <input type="button" className="ForJkx__card-btn" value="В разработке" />
                            </NavLink>
                        </div>
                        <div className="ForJkx__card">
                            <div className="ForJkx__card-content">
                                <h1 className="ForJkx__card-content__title">Мониторинг энергопотребления зданий Университета - Веб-сервис «ЭнергоУчет»</h1>
                                <p className="ForJkx__card-content__descr">Контроль потребления электроэнергия, ХВС, ГВС, теплоснабжение, газ. Предиктивный анализ развития и планирования</p>
                            </div>
                            <NavLink className="ForJkx__card-link" to='/'>
                                <input type="button" className="ForJkx__card-btn" value="В разработке" />
                            </NavLink>
                        </div>
                        <div className="ForJkx__card">
                            <div className="ForJkx__card-content">
                                <h1 className="ForJkx__card-content__title">Программа  «ПТО»</h1>
                                <p className="ForJkx__card-content__descr">
                                </p>
                            </div>
                            <NavLink className="ForJkx__card-link" to='/'>
                                <input type="button" className="ForJkx__card-btn" value="В разработке" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ForJkx__functional">
                <div className="container">
                    <div className="ForJkx__functional-inner">
                        <h1 className="ForJkx__functional-title">Модель информационного взаимодействия</h1>
                        <div className="ForJkx__diagram-container">
                            <img src={modelPhoto} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Main;