import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchWithToken } from '../apiClient';
import config from '../config';
import AuthContext from '../context/AuthContext';
import logo from '../images/logo.png'

const Header = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDroppedMenu, setIsDroppedMenu] = useState(false);
    const [isMenuActive, isMenuActiveSet] = useState(false);

    const menuActive = () => {
        isMenuActiveSet(!isMenuActive);
    };

    const droppedMenu = () => {
        setIsDroppedMenu(!isDroppedMenu);
    };


    const loginHandler = () => {
        navigate('/login');
    };

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    const closeMenu = () => {
        isMenuActiveSet(false);
        setIsDroppedMenu(false);
      };

    const authLinks = (
        <li>
          <div className='menu__list-box'>
            <div className={`menu__list-container ${isDroppedMenu ? 'menu__list-container--active' : ''}`}>
              {auth.profile?.db_access && (
                <div className='menu__option'>
                  <input className='menu__input' type='radio' id='serv1' name='services' />
                  <NavLink className='menu__navlink' to='/techpass' onClick={closeMenu}>
                    Электронный тех. паспорт зданий
                  </NavLink>
                </div>
              )}
            </div>
            <div className='menu__selected' onClick={droppedMenu}>
              Сервисы
            </div>
          </div>
        </li>
      );

      const authHeaderLinks = (
        <ul className='header__list'>
          <li className='header__list-item'>
            <button onClick={logoutHandler} className='header__list-link'>
              Выход
            </button>
          </li>
        </ul>
      );
    
      const guestHeaderLinks = (
        <ul className='header__list'>
          <li className='header__list-item'>
            <button onClick={loginHandler} className='header__list-link'>
              Вход
            </button>
          </li>
        </ul>
      );


    return (
        <div className='top'>
            <header className='header'>
                <div className='container'>
                    <div className='header__inner'>
                        <button
                            onClick={menuActive}
                            className={
                                'menu__btn ' + (isMenuActive ? 'menu__btn--active' : '')
                            }
                        >
                            <svg
                                width='24px'
                                height='24px'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fill='none'
                                    stroke='#fff'
                                    strokeWidth='2'
                                    d='M2,19 L22,19 M2,5 L22,5 M2,12 L22,12'
                                />
                            </svg>
                        </button>

                        <div className='logo__box'>
                            <Link className='logo__link' to='/'>
                                <img src={logo} alt='logo' />
                            </Link>
                        </div>
                        <div className='' />
                        {auth.isAuthenticated ? authHeaderLinks : guestHeaderLinks}
                    </div>
                </div>
            </header>

            <div className={'menu ' + (isMenuActive ? 'menu--active' : '')}>
                <ui className='menu-list'>
                    <li>
                        <NavLink className='menu-list__link' to='/about' onClick={closeMenu}>
                            О платформе
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='menu-list__link' to='/news' onClick={closeMenu}> 
                            Новости
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='menu-list__link' to='/rules' onClick={closeMenu}>
                            Авторские права
                        </NavLink>
                    </li>
                    {auth.isAuthenticated && authLinks}
                </ui>
            </div>
        </div>
    );
};

export default Header;
