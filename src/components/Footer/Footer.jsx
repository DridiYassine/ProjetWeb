import React, { useState } from 'react';
import './footer.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdContactPhone } from 'react-icons/md';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import ContactForm from '../../pages/Contactform';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const year = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useTranslation();

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <div>
                <h1 className="text-white"> {t('siteName')}</h1>
              </div>
            </div>
            <p className="footer__text mt-4">{t('footerText')}</p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">{t('socialMedia')}</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="" className="link-on-hover">
                    <FaFacebook style={{ marginRight: '8px', fontSize: '1.1em' }} />
                    {t('facebook')}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="" className="link-on-hover">
                    <FaInstagram style={{ marginRight: '8px', fontSize: '1.1em' }} />
                    {t('instagram')}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="" className="link-on-hover">
                    <FaFacebook style={{ marginRight: '8px', fontSize: '1.1em' }} />
                    {t('tiktok')}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="/ContactForm" className="link-on-hover" onClick={toggleContactModal}>
                    <MdContactPhone style={{ marginRight: '8px', fontSize: '1.1em' }} />
                    {t('contactUs')}
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">{t('usefulLinks')}</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="/shop" className="link-on-hover">
                    {t('shop')}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="/cart" className="link-on-hover">
                    {t('cart')}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="/login" className="link-on-hover">
                    {t('login')}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="/signup" className="link-on-hover">
                    {t('signup')}
                  </Link>
                  
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">
                <a href="https://maps.app.goo.gl/HeoMXTeB7S3K9cyv7" className="link-on-hover">
                  {t('businessLocation')}
                </a>
              </h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-1">
                  <iframe
                    width="250"
                    height="150"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q=Ville%20Nouvelle%20Tunis,%20Tunisia+(OuiMade)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright text-center mt-4">
              {t('contact')}: <span> <i className="ri-phone-line"></i> </span> Jbeliamenallah@hotmail.com
            </p>
            <p className="footer__copyright text-center mt-2">
              {t('copyright')} © {year} {t('rightsReserved')}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
