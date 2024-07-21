import {React, Fragment, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CarouselPage from '../components/Carousel.js';
import WordPullUp from '../components/magicui/WordPullup.tsx';
import ShimmerButton from '../components/magicui/shiny-button.tsx';
import ShinyButton from '../components/magicui/shiny-button.tsx';
import AnimatedGridPattern, { GridPattern } from '../components/magicui/background.tsx';
import Button from 'react-bootstrap/Button';
import { cn } from '../lib/utils.ts';
import { VelocityScroll } from '../components/magicui/scroll-based-velocity.tsx';
import GradualSpacing from '../components/magicui/gradual-spacing.tsx';
import AnimatedGradientText from '../components/magicui/animated-gradient-text.tsx';
import Calendar, { CenturyView } from 'react-calendar';
import { BentoCard, BentoGrid } from '../components/magicui/bento-grid.tsx';
import Meteors from '../components/magicui/meteors.tsx';
import WordFadeIn from '../components/magicui/word-fade-in.tsx';
import BoxReveal from '../components/magicui/box-reveal.tsx';
import axios from 'axios';




const PricingPage = () => {


  const navigate = useNavigate();
  const navigateToExplore = () => {
    navigate('/viz');
  };


    const [isAnnual, setIsAnnual] = useState(false);

    const handleMonthlyClick = () => {
        if (isAnnual) {
          setIsAnnual(false);
        }
      };
    
      const handleAnnualClick = () => {
        if (!isAnnual) {
          setIsAnnual(true);
        }
      };

  return (
    <div className="h-screen w-screen items-center relative justify-center bg-background md:shadow-xl pb-24 font-mono">
      <GridPattern numSquares={200} className='w-screen h-screen' maxOpacity={0.75}
      />
      <div className='mb-8 mx-12'>
            <BoxReveal boxColor={"white"} duration={0.5}>
        <h1 class="text-xl font-bold tracking-tight text-white sm:text-5xl text-center">
          Data. Made accessible.
        </h1>
      </BoxReveal>
      <BoxReveal boxColor={"white"} duration={0.5}>
      </BoxReveal>
      <BoxReveal boxColor={"white"} duration={0.5}>
        <div className="mt-[1.5rem]">
          <p className='mt-6 text-lg leading-8 text-white text-center'>
           Our pricing options follow a token-based system, giving you low costs and maximum flexbility.
          </p>
        </div>
      </BoxReveal>
 
      
      </div>
 <div class="bg-gray-100 text-black text-mono flex items-center justify-center min-h-80 font-mono relative">
  <div class="text-center min">
   
    <div class="flex justify-around space-x-8">
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-semibold mb-4">What are tokens?</h2>
        <p class="max-w-xs">A token can be seen as akin to currency. When you make a request to visualize or clean your data, you use up a certain number of tokens. When you run out of tokens, you cannot make any more requests until you buy more. As an idea, a simple bar graph would cost you approximately 0.06 tokens</p>
       
      </div>
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-semibold mb-4">You currently have X tokens</h2>
        <p class="max-w-xs">Today's conversion rate is $1 for 1 token</p>
        <BoxReveal boxColor={"black"} duration={0.5}>
      <button
  class="align-middle select-none font-mono font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-md py-3 px-6 rounded-lg bg-black-100 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
  type="button"
  onClick={navigateToExplore}
      >
  Buy tokens now.
      </button>     
      </BoxReveal>
      </div>
     
    </div>
  </div>
</div>
</div>
    
  );












    // <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">       <div className="text-center mb-12">
    //     <h1 className="text-4xl font-extrabold text-white">Pricing plans for teams of all sizes</h1>
    //     <p className="text-lg text-white mt-4">
    //       Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
    //     </p>
    //     <div className="mt-6 inline-flex rounded-md shadow-sm">
    //       <button
    //         onClick={handleMonthlyClick}
    //         className={`py-2 px-4 ${!isAnnual ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-l-md border border-blue-600 hover:bg-blue-700`}
    //       >
    //         Monthly
    //       </button>
    //       <button
    //         onClick={handleAnnualClick}
    //         className={`py-2 px-4 ${isAnnual ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-r-md border border-blue-600 hover:bg-blue-700`}
    //       >
    //         Annually
    //       </button>
    //     </div>
    //   </div>

    //   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //     <div className="bg-white rounded-lg shadow-lg p-8">
    //       <h3 className="text-2xl font-semibold text-gray-800">Hobby</h3>
    //       <p className="text-gray-600 mt-4">The essentials to provide your best work for clients.</p>
    //       <div className="mt-6">
    //         <span className="text-4xl font-extrabold text-gray-900">${isAnnual ? (15 * 12 * 0.75).toFixed(2) : 15}</span>
    //         <span className="text-base font-medium text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
    //       </div>
    //       <ul className="mt-6 space-y-4">
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">5 products</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Up to 1,000 subscribers</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Basic analytics</span>
    //         </li>
    //       </ul>
    //       <button className="mt-8 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    //         Buy plan
    //       </button>
    //     </div>
    //     <div className="bg-white rounded-lg shadow-lg p-8">
    //       <h3 className="text-2xl font-semibold text-gray-800">Freelancer</h3>
    //       <p className="text-gray-600 mt-4">The essentials to provide your best work for clients.</p>
    //       <div className="mt-6">
    //         <span className="text-4xl font-extrabold text-gray-900">${isAnnual ? (30 * 12 * 0.75).toFixed(2) : 30}</span>
    //         <span className="text-base font-medium text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
    //       </div>
    //       <ul className="mt-6 space-y-4">
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">5 products</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Up to 1,000 subscribers</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Basic analytics</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">48-hour support response time</span>
    //         </li>
    //       </ul>
    //       <button className="mt-8 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    //         Buy plan
    //       </button>
    //     </div>
    //     <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-600">
    //       <h3 className="text-2xl font-semibold text-blue-600">Startup</h3>
    //       <p className="text-gray-600 mt-4">A plan that scales with your rapidly growing business.</p>
    //       <div className="mt-6">
    //         <span className="text-4xl font-extrabold text-gray-900">${isAnnual ? (60 * 12 * 0.75).toFixed(2) : 60}</span>
    //         <span className="text-base font-medium text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
    //       </div>
    //       <ul className="mt-6 space-y-4">
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">25 products</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Up to 10,000 subscribers</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Advanced analytics</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">24-hour support response time</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Marketing automations</span>
    //         </li>
    //       </ul>
    //       <button className="mt-8 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    //         Buy plan
    //       </button>
    //     </div>
    //     <div className="bg-white rounded-lg shadow-lg p-8">
    //       <h3 className="text-2xl font-semibold text-gray-800">Enterprise</h3>
    //       <p className="text-gray-600 mt-4">Dedicated support and infrastructure for your company.</p>
    //       <div className="mt-6">
    //         <span className="text-4xl font-extrabold text-gray-900">${isAnnual ? (90 * 12 * 0.75).toFixed(2) : 90}</span>
    //         <span className="text-base font-medium text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
    //       </div>
    //       <ul className="mt-6 space-y-4">
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Unlimited products</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Unlimited subscribers</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Advanced analytics</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">1-hour, dedicated support response time</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Marketing automations</span>
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-600 font-semibold">✓</span>
    //           <span className="ml-3 text-gray-600">Custom reporting tools</span>
    //         </li>
    //       </ul>
    //       <button className="mt-8 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    //         Buy plan
    //       </button>
    //     </div>
    //   </div>
    // </div>
  
};

export default PricingPage;
