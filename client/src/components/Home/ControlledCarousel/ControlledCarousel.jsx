import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden m-0 p-0">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="rounded-none w-full bg-transparent"
      >
        <Carousel.Item className="h-screen">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/banner%2Fbanner.png?alt=media&token=0cca48c2-381f-43e3-932d-1ab9b6cc1a78"
            alt="First slide"
            className="w-full h-screen object-cover"
          />
        </Carousel.Item>
        <Carousel.Item className="h-screen">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/banner%2Fbanner.png?alt=media&token=0cca48c2-381f-43e3-932d-1ab9b6cc1a78"
            alt="Second slide"
            className="w-full h-screen object-cover"
          />
        </Carousel.Item>
        <Carousel.Item className="h-screen">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/asdd-e8832.appspot.com/o/banner%2Fbanner.png?alt=media&token=0cca48c2-381f-43e3-932d-1ab9b6cc1a78"
            alt="Third slide"
            className="w-full h-screen object-cover"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
