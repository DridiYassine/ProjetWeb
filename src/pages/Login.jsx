import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import { sendPasswordResetEmail } from 'firebase/auth';

import '../styles/login.css';

import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simulate a delay before navigating
      setTimeout(() => {
        console.log(user);
        setLoading(false);
        toast.success(t('loginSuccess'));
        navigate('/home');
      }, 2000); // Adjust the delay time (in milliseconds) as needed
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(t('loginError'));
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(t('resetPasswordSuccess'));
    } catch (error) {
      toast.error(t('resetPasswordError'));
    }
  };

  return (
    <Helmet title={t('loginTitle')}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg='6'>
                <LoadingSpinner />
              </Col>
            ) : (
              <Col lg='6' className='m-auto text-center'>
                <h3 className='mt-5 mb-4 fw-bold fs-4'> {t('loginHeading')} </h3>
                <Form className='mt-3 auth-form' onSubmit={signin}>
                  <FormGroup className='form-group'>
                    <input
                      type='email'
                      placeholder={t('emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className='form-group'>
                    <input
                      type='password'
                      placeholder={t('passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <button className='buy__btn auth__btn' type='submit'>
                    {t('loginButton')}
                  </button>
                  <p className='mt-5'>
                    {t('noAccount')}{' '}
                    <Link to='/signup'>
                      <strong>{t('createAccount')}</strong>
                    </Link>{' '}
                  </p>
                  <button type="button" className="btn btn-link" onClick={handleResetPassword}>
                    {t('forgotPassword')}
                  </button>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
