import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Toaster, toast } from 'sonner';

const Payment: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [bookingDetails, setBookingDetails] = useState({
    userId: '',
    vehicleId: '',
    locationId: '',
    bookingDate: '',
    returnDate: '',
    totalAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('http://localhost:8000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: bookingDetails.totalAmount * 100 }), // amount in cents
      });

      const { client_secret } = await response.json();

      if (!client_secret) {
        toast.error('Failed to create payment intent');
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent) {
        const paymentData = {
          booking_id: bookingDetails.vehicleId,
          amount: bookingDetails.totalAmount,
          payment_method: 'card',
          transaction_id: paymentIntent.id,
        };

        const res = await fetch('http://localhost:8000/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        if (res.ok) {
          toast.success('Payment successful and booking created!');
        } else {
          toast.error('Failed to create booking');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="p-4 ">
        <h1 className="text-xl my-4">Book a Car</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label htmlFor="userId" className="block">User ID:</label>
            <input
              id="userId"
              type="text"
              name="userId"
              value={bookingDetails.userId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="vehicleId" className="block">Vehicle ID:</label>
            <input
              id="vehicleId"
              type="text"
              name="vehicleId"
              value={bookingDetails.vehicleId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="locationId" className="block">Location ID:</label>
            <input
              id="locationId"
              type="text"
              name="locationId"
              value={bookingDetails.locationId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="bookingDate" className="block">Booking Date:</label>
            <input
              id="bookingDate"
              type="date"
              name="bookingDate"
              value={bookingDetails.bookingDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="returnDate" className="block">Return Date:</label>
            <input
              id="returnDate"
              type="date"
              name="returnDate"
              value={bookingDetails.returnDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="totalAmount" className="block">Total Amount:</label>
            <input
              id="totalAmount"
              type="number"
              name="totalAmount"
              value={bookingDetails.totalAmount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="cardElement" className="block">Card Details:</label>
            <CardElement id="cardElement" className="w-full p-2 rounded bg-gray-700 text-white" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!stripe}>Book and Pay</button>
        </form>
      </div>
    </>
  );
};

export default Payment;
