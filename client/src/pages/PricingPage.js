import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import BoxReveal from '../components/magicui/box-reveal.tsx';
import { GridPattern } from '../components/magicui/background.tsx';
import axios from 'axios';

const stripePromise = loadStripe('your_publishable_key_here');

const StripeCardElement = () => {
  return (
    <div className="mb-4">
      <CardElement options={{style: {base: {fontSize: '16px'}}}} />
    </div>
  );
};

const PackageButton = ({ package_name, tokens, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a payment intent on backend
      const response = await axios.post('/create-payment-intent', {
        package_name: package_name,
        amount: price * 100, //amount in cents
      });
    
      const { clientSecret } = response.data;

      // Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'User Name', //replace with the Signed In name 
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded!');
          // [UPDATE THE TOKEN BALANCE HERE]
        }
      }
    } catch (error) {
      setPaymentError('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}
      <button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-full"
      >
        {isProcessing ? 'Processing...' : `Buy ${tokens} tokens for $${price}`}
      </button>
    </form>
  );
};

const PricingPage = () => {
  const navigate = useNavigate();
  const navigateToExplore = () => {
    navigate('/pricing');
  };

  const [currentTokens, setCurrentTokens] = useState(0);

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen w-full bg-background font-mono">
        <GridPattern numSquares={200} className='fixed inset-0' maxOpacity={0.75} />
        
        <div className='relative z-10 px-4 py-12'>
          <BoxReveal boxColor={"white"} duration={0.5}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-center mb-4">
              Data. Made accessible.
            </h1>
          </BoxReveal>
          
          <BoxReveal boxColor={"white"} duration={0.5}>
            <p className='text-lg md:text-xl leading-8 text-white text-center mb-12'>
              Our pricing options follow a token-based system, giving you low costs and maximum flexibility.
            </p>
          </BoxReveal>

          <div className="bg-gray-100 text-black rounded-lg shadow-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-2xl font-semibold mb-4">What are tokens?</h2>
                <p className="max-w-xs text-center md:text-left">A token can be seen as akin to currency. When you make a request to visualize or clean your data, you use up a certain number of tokens. When you run out of tokens, you cannot make any more requests until you buy more. As an idea, a simple bar graph would cost you approximately 0.06 tokens</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-2xl font-semibold mb-4">You currently have {currentTokens} tokens</h2>
                <p className="max-w-xs text-center md:text-left mb-4">Today's conversion rate is $1 for 1 token</p>
                <BoxReveal boxColor={"black"} duration={0.5}>
                  <button
                    className="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-md py-3 px-6 rounded-lg bg-black text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    onClick={navigateToExplore}
                  >
                    Buy tokens now
                  </button>     
                </BoxReveal>
              </div>
            </div>
          </div>

          {/**
           * Token Packages
           */}
          
          <div className="bg-white text-black rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Token Packages</h2>
            <StripeCardElement />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <p className="mb-4">100 tokens for $95 ($0.95/token)</p>
                <PackageButton package_name="Starter" tokens={100} price={95} />
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="mb-4">500 tokens for $450 ($0.90/token)</p>
                <PackageButton package_name="Pro" tokens={500} price={450} />
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <p className="mb-4">2000 tokens for $1700 ($0.85/token)</p>
                <PackageButton package_name="Enterprise" tokens={2000} price={1700} />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 text-black rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Token Costs for Common Operations</h2>
            <div className="flex justify-center">
              <ul className="list-disc list-inside">
                <li>Simple bar graph: 0.06 tokens</li>
                <li>Scatter plot: 0.08 tokens</li>
                <li>Line chart: 0.07 tokens</li>
                <li>Basic data cleaning (per 1000 rows): 0.1 tokens</li>
                <li>Advanced statistical analysis: 0.5-2 tokens (depending on complexity)</li>
                
              </ul>
            </div>
          </div>

          <div className="bg-white text-black rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">What happens if I run out of tokens mid-analysis?</h3>
                <p>The operation will pause, and you'll be prompted to purchase more tokens to continue.</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Can I get a refund for unused tokens?</h3>
                <p>Tokens are non-refundable, but they don't expire as long as your account is active.</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">How do I know how many tokens an operation will cost?</h3>
                <p>Before confirming any operation, you'll see an estimated token cost. You can also find a full pricing breakdown in your account settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default PricingPage;