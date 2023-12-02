import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

import Helmet from '../components/Helmet/Helmet'
import '../styles/home.css';
import Services from '../services/Services';
import { Container, Row, Col } from 'reactstrap';
import hero from '../assets/images/hero.png'
import { Link } from 'react-router-dom';
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products'
import { useEffect, useState } from 'react'
import counter from '../assets/images/prod2.png'
import Clock from '../components/UI/Clock';
import {db} from '../firebase.config';
import { setDoc, doc, getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';


const Home = () => {;
  const { t } = useTranslation();
  const [trendingProducts,setTrendingProducts] = useState([]);
  const [bestSalesProducts,setBestSalesProducts] = useState([]);
  const [displayName, setUsername] = useState('');

  const year = new Date().getFullYear();
  useEffect(()=>{
    const usersRef = collection(db, 'users');  // Assurez-vous que 'users' est le nom correct de votre collection

    getDocs(usersRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data()); // Vérifiez ici
        setUsername(doc.data().displayName);
      });
    })
      .catch((error) => {
        console.error('Erreur lors de la récupération du nom d\'utilisateur:', error);
      });
    const filteredTrendingProducts = products.filter(
      (item) =>item.category=='Bag'
      );
    const filteredBestSalesProducts = products.filter(
        (item) =>item.category=='Bag'
        );
      setTrendingProducts(filteredTrendingProducts);
      setBestSalesProducts(filteredBestSalesProducts);
  },[]);
  return <Helmet title={'Home'}>
     <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <h2>{t('welcome')}, {displayName}!</h2>
                <p className="hero__subtitle">{t('trendingProduct', { year })}</p>
                <h2>{t('accessorize')}</h2>
                <p>{t('exploreStyle')}</p>
                <p>{t('findPerfect')}</p>
                <p>{t('letAccessoriesTell')}</p>
                <p>{t('discoverFashion')}</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to='/shop'>{t('shopNow')}</Link>
                </motion.button>
              </div>
            </Col>
            <Col lang='6' md='6'>
              <div className="hero__img">
                <img src={hero} alt="heroimage" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>



    <Services />
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg='12'className='text-center'>
              <h2 className="section__title">{t('latestProducts')}</h2>

              </Col>
              <ProductsList data={trendingProducts}/>
            </Row>
          </Container>
        </section>
        <section className="best__sales">
          <Container>
            <Row>
              <Col lg="12" className='text-center'>
              <h2 className="section__title">{t('bestSales')}</h2>
              </Col>
              <ProductsList data={bestSalesProducts}/>
            </Row>
          </Container>
        </section>
        <section className="timer__count">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="clock__top-content">
                <h5 className='text-white fs-7 mb-2'>{t('limitedOffer')}</h5>
                  <h2 className='text-white fs-5 mb-3 nameprod'>Crystal Bag</h2>
                </div>
                <Clock/>
                <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn">
  <Link to='/shop'>{t('browseStore')}</Link>
</motion.button>

              </Col>
               <Col lg="6" md="12" className='text-end counter__img' >
                <img src={counter} alt="" />
               </Col>
            </Row>
          </Container>
        </section>
        <section className="best__sales">
          <Container>
            <Row>
              <Col lg="12" className='text-center'>
              <h2 className="section__title">{t('bestSales')}</h2>
              </Col>
              <ProductsList data={bestSalesProducts}/>
            </Row>
          </Container>
        </section>
  </Helmet>
}

export default Home