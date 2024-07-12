import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Pa97oRpQcElLiYaQzibyputQ9WG7zPp2bPJVRxzPtxxLHHgkBab2vda5Ji4Ykg0zaCWXlFYggOayjIT70DaxCvV00ytrrZdXZ');

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    booking_id: '',
    amount: '',
    payment_method: 'card',
  });
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/payments', formData);
      setClientSecret(response.data.client_secret);
      setError('');

      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const result = await stripe.confirmCardPayment(response.data.client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Customer Name',
            },
          },
        });

        if (result.error) {
          setError(result.error.message || 'Payment failed');
        } else {
          if (result.paymentIntent?.status === 'succeeded') {
            console.log('Payment successful');
          }
        }
      }
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="booking_id">Booking ID</label>
          <input
            type="text"
            name="booking_id"
            value={formData.booking_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Submit Payment
        </button>
      </form>
      {error && <p>{error}</p>}
      {clientSecret && <p>Client Secret: {clientSecret}</p>}
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
