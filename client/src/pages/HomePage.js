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

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";



const HomePage = () => {
  const navigate = useNavigate();
  const formKey = process.env.WEB3_FORM;

  // Function to handle button click and navigate to another route
  const navigateToExplore = () => {
    navigate('/choose');
  };

  return (
    <div className="h-screen w-screen items-center relative justify-center bg-background md:shadow-xl pb-24 font-mono">
      <GridPattern numSquares={200} className='w-screen h-screen' maxOpacity={0.75}
      />
      <div className='mb-8 mx-12'>
            <BoxReveal boxColor={"white"} duration={0.5}>
        <h1 class="text-xl font-bold tracking-tight text-white sm:text-5xl text-center">
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
  class="align-middle select-none font-mono font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-100 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
  type="button"
  onClick={navigateToExplore}
      >
  Explore
      </button>     
      </BoxReveal>
      </div>
 <div class="bg-gray-100 text-black text-mono flex items-center justify-center min-h-80 font-mono relative">
  <div class="text-center min">
    <h1 class="text-4xl font-bold mb-12">Effortless Data Mastery.</h1>
    <div class="flex justify-around space-x-8">
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-semibold mb-4">Simplify Data</h2>
        <p class="max-w-xs">Our tools take the complexity out of data processing, so you can focus on what matters most.</p>
      </div>
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-semibold mb-4">Unlock Insights</h2>
        <p class="max-w-xs">Discover hidden trends and patterns in your data with our robust analysis features.</p>
      </div>
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-semibold mb-4">Visually Stunning</h2>
        <p class="max-w-xs">Transform data into beautiful, easy-to-understand visualizations.</p>
      </div>
    </div>
  </div>
</div>

<div class="bg-black text-white flex items-center justify-center p-14 relative font-mono">
    <div class="text-center">
        <h1 class="text-4xl font-bold mb-8">Why Choose Data Tool?</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="flex items-center justify-center mb-4">
                    <div class="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">1</div>
                </div>
                <h2 class="text-xl font-semibold">Efficiency</h2>
                <p>We handle the tedious data processing tasks, saving you valuable time and effort.</p>
            </div>
            <div>
                <div class="flex items-center justify-center mb-4">
                    <div class="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">2</div>
                </div>
                <h2 class="text-xl font-semibold">Accuracy</h2>
                <p>Our state-of-the-art algorithms ensure your data is clean and reliable.</p>
            </div>
            <div>
                <div class="flex items-center justify-center mb-4">
                    <div class="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">3</div>
                </div>
                <h2 class="text-xl font-semibold">Insightful</h2>
                <p>Access powerful analytics and visualizations that drive smarter decision-making.</p>
            </div>
            <div>
                <div class="flex items-center justify-center mb-4">
                    <div class="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">4</div>
                </div>
                <h2 class="text-xl font-semibold">User-Friendly</h2>
                <p>Our intuitive interface makes data processing and visualization accessible to everyone.</p>
            </div>
        </div>
    </div>
</div>

<div class="flex min-h-screen items-center justify-center bg-white font-mono">
  <div class="w-screen bg-white">
    <div class="p-6">
      <h1 class="text-center text-4xl font-bold">How it works</h1>
      <div class="space-y-6">
        <div class="flex items-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span class="text-xl font-bold">1</span>
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">Upload Data</h2>
            <p>Easily upload your data files in various formats.</p>
          </div>
        </div>
       
        <div class="flex justify-center">
          <div class="h-8 w-8 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20" class="h-full w-full">
              <path fill-rule="evenodd" d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 011.4-1.4L9 15.59V3a1 1 0 012 0v12.59l5.3-5.29a1 1 0 111.4 1.42l-7 7A1 1 0 0110 18z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
       
        <div class="flex items-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span class="text-xl font-bold">2</span>
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">Automatic Cleansing</h2>
            <p>Our system automatically cleans and prepares your data for analysis.</p>
          </div>
        </div>
       
        <div class="flex justify-center">
          <div class="h-8 w-8 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20" class="h-full w-full">
              <path fill-rule="evenodd" d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 011.4-1.4L9 15.59V3a1 1 0 012 0v12.59l5.3-5.29a1 1 0 111.4 1.42l-7 7A1 1 0 0110 18z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
       
        <div class="flex items-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span class="text-xl font-bold">3</span>
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">In-Depth Analysis</h2>
            <p>Receive detailed reports and analytics based on your cleansed data.</p>
          </div>
        </div>
       
        <div class="flex justify-center">
          <div class="h-8 w-8 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20" class="h-full w-full">
              <path fill-rule="evenodd" d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 011.4-1.4L9 15.59V3a1 1 0 012 0v12.59l5.3-5.29a1 1 0 111.4 1.42l-7 7A1 1 0 0110 18z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <span class="text-xl font-bold">4</span>
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">Visualize</h2>
            <p>Get beautiful, ready-to-use visualizations that can be customized to fit your needs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<footer className="bg-black text-white text-center py-4 mt-auto">
          <p>&copy; {new Date().getFullYear()} DataTool. All rights reserved.</p>
        </footer>

</div>
    
  );
};

export default HomePage;