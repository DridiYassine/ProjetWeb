import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios'; // Import axios
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../styles/paymentform.css';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase.config';
import { cartActions } from '../redux/slices/cartSlice';
import { collection, addDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

export const PaymentForm = () => {
  const form = useRef();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  function verifyCardDetails(cardNumber, cvv) {
    const validCardDetails = {
      '1234567890123456': { cvv: '123', expirationDate: '12/23' },
      '1234567890123457': { cvv: '123', expirationDate: '12/23' },
      '1234567890123458': { cvv: '123', expirationDate: '12/23' },
    };

    const validDetail = validCardDetails[cardNumber];
    return validDetail && cvv === validDetail.cvv;
  }

  const encryptData = (data) => {
    const secretKey = 'secret_key';
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
  };

  const orderId = Date.now().toString();
  const dispatch = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dbRef = collection(db, 'commande');

  const storeOrderInFirebase = async () => {
    try {
      const formData = new FormData(form.current);
      const username = formData.get('user_name');
      const email = formData.get('from_name');
      const cardNumber = formData.get('card_number');
      const cvv = formData.get('cvv');
      const expirationDate = formData.get('expiration_date');

      if (verifyCardDetails(cardNumber, cvv)) {
        const encryptedCardNumber = encryptData(cardNumber);
        const encryptedCVV = encryptData(cvv);
        const encryptedExpirationDate = encryptData(expirationDate);

        const paymentDetailsRef = collection(db, 'paymentdetails');
        const paymentDetailsData = {
          orderId,
          username,
          email,
          cardNumber: encryptedCardNumber,
          cvv: encryptedCVV,
          expirationDate: encryptedExpirationDate,
        };

        try {
          const orderData = {
            orderId,
            totalQty,
            totalAmount,
          };
          await addDoc(dbRef, orderData);
          dispatch(cartActions.clearCart());
          console.log('Commande tzedet rakez');

          // Trigger the server to send the confirmation email
          await axios.post('http://localhost:3003/api/send-email', {
            user_name: username,
            user_email: email,
            card_number: cardNumber,
          });

          console.log('Confirmation email sent');
        } catch (error) {
          console.error('Error storing order in Firebase:', error);
        }

        await addDoc(paymentDetailsRef, paymentDetailsData);
        console.log('cbn tzedet payment details');
      } else {
        console.error('Invalid card details');
      }
    } catch (error) {
      console.error('Error storing order in Firebase:', error);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ol8cf4y', 'template_za22x99', form.current, 'vJUZu2TSOQff0qx2d')
      .then(
        (result) => {
          console.log(result.text);
          console.log('message sent');
          toast.success('✉️ Admin Notified Successfully !');
        },
        (error) => {
          console.log(error.text);
        }
      );

    toggleModal();
  };

  return (
    <>
      <button onClick={toggleModal} className="buy__btn auth__btn w-100">Pay Bills</button>

      <Modal isOpen={isModalOpen} toggle={toggleModal} className="payment-modal">
        <ModalHeader toggle={toggleModal}>Payment Details</ModalHeader>
        <ModalBody>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="input-group">
              <input
                type="text"
                name="user_name"
                id="card_holder"
                className="form-input"
                placeholder="Cardholder's Name"
                required
                minLength="2" 
              />
              <i className="far fa-user icon"></i>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="card_number"
                id="card_number"
                className="form-input"
                placeholder="Card Number"
                required
                 
              />
              <i className="fas fa-credit-card icon"></i>
            </div>

            <div className="input-group">
              <input
                type="month"
                name="expiration_date"
                id="expiration_date"
                className="form-input"
                placeholder="Expiration Date"
                required
              />
              <i className="far fa-calendar-alt icon"></i>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="cvv"
                id="cvv"
                className="form-input"
                placeholder="CVV"
                required
                pattern="[0-9]{3}" // 3 digits for CVV
              />
              <i className="fas fa-lock icon"></i>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="from_name"
                id="user_email"
                className="form-input"
                placeholder="Email"
                required
              />
              <i className="fas fa-envelope icon"></i>
            </div>
            <input type="submit" value="Pay Now" className="buy__btn" onClick={storeOrderInFirebase}/>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default PaymentForm;
