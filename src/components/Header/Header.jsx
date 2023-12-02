import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { motion } from 'framer-motion';
import { Container, Row } from 'reactstrap';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import useAuth from '../../Custom-hooks/useAuth';

const nav__links = [
  {
    path: 'home',
    display: 'home',
  },
  {
    path: 'shop',
    display: 'shop',
  },
  {
    path: 'cart',
    display: 'cart',
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const { currentUser } = useAuth();

  const NavigateToCart = () => {
    navigate('/Cart');
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  });

  const menuToglle = () => menuRef.current.classList.toggle('active__menu');

  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.success(t('logoutSuccess'));
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const toggleProfileActions = (event) => {
    const targetElement = event.target;

    if (
      targetElement.classList.contains('avatar-image') ||
      targetElement.closest('.profile')
    ) {
      profileActionRef.current.classList.toggle('show__profileActions');
    }
  };

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className='logo'>
              <img src={logo} alt='' style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div className='navigation' ref={menuRef} onClick={menuToglle}>
              <ul className='menu'>
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? 'nav__active' : '')}
                    >
                      {t(item.display)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='nav__icons'>
              <span className='cart__icon' onClick={NavigateToCart}>
                <i className='ri-shopping-cart-line'></i>
                <span className='badge'>{totalQuantity}</span>
              </span>
              <div className='profile' onClick={(event) => toggleProfileActions(event)}>
                <motion.img
                  whileTap={{ scale: 1.3 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=''
                  className='avatar-image'
                />
                <div className='profileactions' ref={profileActionRef} onClick={toggleProfileActions}>
                  {currentUser ? (
                    <span onClick={Logout}>{t('logout')}</span>
                  ) : (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to='/signup'>{t('signup')}</Link>
                      <div className='horizontal-line'></div>
                      <Link to='/login'>{t('login')}</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className='mobile__menu'>
                <span onClick={menuToglle}>
                  <i className='ri-menu-line'></i>
                </span>
              </div>
              <div className='language__buttons btn-group'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => changeLanguage('en')}
                >
                  {t('EN')}
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => changeLanguage('fr')}
                >
                  {t('FR')}
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
