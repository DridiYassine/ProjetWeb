import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import products from '../assets/data/products';
import ProducLists from '../components/UI/ProductsList';

const Shop = () => {
  const { t } = useTranslation();

  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'Bag') {
      const filteredProducts = products.filter((item) => item.category === 'Bag');
      setProductsData(filteredProducts);
    }
    if (filterValue === 'watch') {
      const filteredProducts = products.filter((item) => item.category === 'watch');
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title={t('commonSectionShopTitle')}>
      <Container>
        <section>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>{t('filterByCategory')}</option>
                  <option value="Bag">{t('commonSectionBag')}</option>
                  <option value="watch">{t('commonSectionWatch')}</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <input type="text" placeholder={t('searchForProduct')} onChange={handleSearch} />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">{t('noProducts')}</h1>
            ) : (
              <ProducLists data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
