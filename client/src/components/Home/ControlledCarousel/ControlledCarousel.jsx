import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ExampleCarouselImage } from '../ExampleCarouselImage/ExampleCarouselImage';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="mt-20 min-h-[40vh]" style={{ width: '100%' }}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" imageUrl={'/images/bannerexample.png'} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Second slide" imageUrl={'/images/bannerexample.png'} />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Third slide" imageUrl={'/images/bannerexample.png'} />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
