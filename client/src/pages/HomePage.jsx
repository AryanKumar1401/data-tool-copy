import {React, Fragment, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedGridPattern, { GridPattern } from '../components/magicui/background.tsx';
import BoxReveal from '../components/magicui/box-reveal.tsx';
import axios from 'axios';



const HomePage = () => {
  const navigate = useNavigate();

  // Function to handle button click and navigate to another route
  const navigateToExplore = () => {
    navigate('/viz');
  };

  return (
    <div className="h-screen w-screen items-center relative justify-center bg-background md:shadow-xl pb-24 font-mono">
      <GridPattern numSquares={200} className='w-screen h-screen' maxOpacity={0.75}
      />
      <div className='mb-8 mx-12'>
            <BoxReveal boxColor={"white"} duration={0.5}>
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-5xl text-center">
          Data Tool: Transform your data with ease<span className="text-white">.</span>
        </h1>
      </BoxReveal>
      <BoxReveal boxColor={"white"} duration={0.5}>
      </BoxReveal>
      <BoxReveal boxColor={"white"} duration={0.5}>
        <div className="mt-[1.5rem]">
          <p className='mt-6 text-lg leading-8 text-white text-center'>
           Transform raw data into insightful visualizations that drive smarter decisions.
          </p>
        </div>
      </BoxReveal>
 
      <BoxReveal boxColor={"white"} duration={0.5}>
      <button
  className="align-middle select-none font-mono font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-100 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
  type="button"
  onClick={navigateToExplore}
      >
  Explore
      </button>     
      </BoxReveal>
      </div>
 <div className="bg-gray-100 text-black text-mono flex items-center justify-center min-h-80 font-mono relative">
  <div className="text-center min">
    <h1 className="text-4xl font-bold mb-12">Effortless Data Mastery.</h1>
    <div className="flex justify-around space-x-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Simplify Data</h2>
        <p className="max-w-xs">Our tools take the complexity out of data processing, so you can focus on what matters most.</p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Unlock Insights</h2>
        <p className="max-w-xs">Discover hidden trends and patterns in your data with our robust analysis features.</p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Visually Stunning</h2>
        <p className="max-w-xs">Transform data into beautiful, easy-to-understand visualizations.</p>
      </div>
    </div>
  </div>
</div>

<div className="bg-black text-white flex items-center justify-center p-14 relative font-mono">
    <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Why Choose Data Tool?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">1</div>
                </div>
                <h2 className="text-xl font-semibold">Efficiency</h2>
                <p>We handle the tedious data processing tasks, saving you valuable time and effort.</p>
            </div>
            <div>
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">2</div>
                </div>
                <h2 className="text-xl font-semibold">Accuracy</h2>
                <p>Our state-of-the-art algorithms ensure your data is clean and reliable.</p>
            </div>
            <div>
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">3</div>
                </div>
                <h2 className="text-xl font-semibold">Insightful</h2>
                <p>Access powerful analytics and visualizations that drive smarter decision-making.</p>
            </div>
            <div>
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">4</div>
                </div>
                <h2 className="text-xl font-semibold">User-Friendly</h2>
                <p>Our intuitive interface makes data processing and visualization accessible to everyone.</p>
            </div>
        </div>
    </div>
</div>

<div className="flex min-h-screen items-center justify-center bg-white font-mono">
  <div className="w-screen bg-white">
    <div className="p-6">
      <h1 className="text-center text-4xl font-bold">How it works</h1>
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span className="text-xl font-bold">1</span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Upload Data</h2>
            <p>Easily upload your data files in various formats.</p>
          </div>
        </div>
       
        <div className="flex justify-center">
          <div className="h-8 w-8 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-full w-full">
              <path fill-rule="evenodd" d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 011.4-1.4L9 15.59V3a1 1 0 012 0v12.59l5.3-5.29a1 1 0 111.4 1.42l-7 7A1 1 0 0110 18z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
       
        <div className="flex items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span className="text-xl font-bold">2</span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Automatic Cleansing</h2>
            <p>Our system automatically cleans and prepares your data for analysis.</p>
          </div>
        </div>
       
        <div className="flex justify-center">
          <div className="h-8 w-8 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-full w-full">
              <path fill-rule="evenodd" d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 011.4-1.4L9 15.59V3a1 1 0 012 0v12.59l5.3-5.29a1 1 0 111.4 1.42l-7 7A1 1 0 0110 18z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
       
        <div className="flex items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span className="text-xl font-bold">3</span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">In-Depth Analysis</h2>
            <p>Receive detailed reports and analytics based on your cleansed data.</p>
          </div>
        </div>
       
        <div className="flex justify-center">
          <div className="h-8 w-8 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-full w-full">
              <path fill-rule="evenodd" d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 011.4-1.4L9 15.59V3a1 1 0 012 0v12.59l5.3-5.29a1 1 0 111.4 1.42l-7 7A1 1 0 0110 18z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span className="text-xl font-bold">4</span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Visualize</h2>
            <p>Get beautiful, ready-to-use visualizations that can be customized to fit your needs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<section className="bg-gray-900" id = 'contact'>
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a specific feature? Let us know.</p>
    <form id="contact-form" className="space-y-8" action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="66d78b62-c011-482c-90bd-5d268f538f72"></input>
      <div>
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
        <input type="email" id="email" name = "email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required />
      </div>
      <div>
        <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
        <input type="text" name="name" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
      </div>
      <div className="sm:col-span-2">
        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
        <textarea id="message" name='message' rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
      </div>
      <button type="submit" className="py-3 px-4 text-sm bg-blue-600 font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
    </form>
  </div>
</section>
<footer className="bg-black text-white text-center py-4 mt-auto">
          <p>&copy; {new Date().getFullYear()} DataTool. All rights reserved.</p>
        </footer>
</div>
    
  );
};

export default HomePage;