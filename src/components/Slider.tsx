import React, { FC, useRef } from 'react';
import styled from 'styled-components';

interface ISliderProps {
  children: React.ReactNode;
}

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 20px;
`;

const SliderContainer = styled.div`
  display: flex;
  overflow-x: overlay;
  scroll-behavior: smooth;
  gap: 18px 5px;
  padding-bottom: 21px;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Arrow = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const ArrowIcon = styled.span`
  line-height: 0;
  font-size: 24px;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slider: FC<ISliderProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 183;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 183;
    }
  };

  return (
    <SliderWrapper role="slider">
      <Arrow className="left" onClick={handleScrollLeft}>
        <ArrowIcon>❮</ArrowIcon>
      </Arrow>
      <SliderContainer ref={containerRef}>
        {children}
      </SliderContainer>
      <Arrow className="right" onClick={handleScrollRight}>
        <ArrowIcon>❯</ArrowIcon>
      </Arrow>
    </SliderWrapper>
  );
};

export default Slider;
