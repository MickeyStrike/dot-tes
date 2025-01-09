import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface CarouselProps {
  images: string[];
}

const CarouselContainer = styled.div`
  position: relative;
  width: 80%;
  max-width: 1140px;
  height: 300px;
  margin: auto;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 150px;
    width: 95%;
  }
`;

const CarouselSlide = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  transform: translateX(-${props => props.currentIndex * 100}%);
`;

const CarouselItem = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CarouselButton = styled.button<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  ${props => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Carousel: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(current => 
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(current => 
      current === 0 ? images.length - 1 : current - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <CarouselContainer>
      <CarouselButton direction="prev" onClick={prevSlide}>❮</CarouselButton>
      <CarouselSlide currentIndex={currentIndex}>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <CarouselImage
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselSlide>
      <CarouselButton direction="next" onClick={nextSlide}>❯</CarouselButton>
    </CarouselContainer>
  );
};

export default Carousel;
