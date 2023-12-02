import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';
import { toast } from 'react-toastify';
import { setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Signup = () => {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(userCredential.user);

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // Hash the password (Note: You might want to use a secure method for hashing)
            const hashedPassword = password;

            // Store user data in the Firestore database
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
              password: hashedPassword,
            });
          });
        }
      );

      setLoading(false);
      toast.success(t('signupSuccess'));
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(t('signupError'));
    }
  };

  return (
    <Helmet title={t('signupTitle')}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg='6'>
                <LoadingSpinner />
              </Col>
            ) : (
              <Col lg='6' className='m-auto text-center'>
                <Form className='mt-3 auth-form' onSubmit={signup}>
                  <h3 className='mt-5 mb-4 fw-bold fs-4'>{t('signupHeading')}</h3>
                  <FormGroup className='form-group'>
                    <input type='text' placeholder={t('usernamePlaceholder')} value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className='form-group'>
                    <input type='email' placeholder={t('emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className='form-group'>
                    <input type='password' placeholder={t('passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className='form-group'>
                    <input type='file' onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button className='buy__btn auth__btn' type='submit'>
                    {t('signupButton')}
                  </button>
                  <p className='mt-5'>
                    {t('alreadyAccount')}{' '}
                    <Link to='/login'>
                      <strong>{t('connect')}</strong>
                    </Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
