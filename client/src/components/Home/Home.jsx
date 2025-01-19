import React from 'react';
import ControlledCarousel from './ControlledCarousel/ControlledCarousel';
import HowToUse from './HowToUse/HowToUse';
import { FaWhatsapp } from 'react-icons/fa';

function Home() {
  return (
    <main>
      <ControlledCarousel />
      <HowToUse />
      
    </main>
  );
}

export default Home;
