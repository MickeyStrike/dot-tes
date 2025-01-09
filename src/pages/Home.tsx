import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Slider from '../components/Slider';
import useProductServices, { Product } from '../services/productService';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #666;
`;

const SectionWrapper = styled.div`
  margin: 24px 0;
`;

const ContainerSection = styled.div`
  max-width: 1140px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  padding: 0 16px;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.42857rem;
  font-weight: 800;
  line-height: 2.35714rem;
  color: #212121;
  margin-bottom: 16px;
`;

// Mock carousel images
const images = [
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/10/4/eb07ecdd-9893-4837-ae01-a3e63dff7ce7.jpg.webp?ect=4g",
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/10/7/a4ceae4e-6872-4b2f-9ab2-a2a7852de86e.jpg.webp?ect=4g",
];

const Home: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productServices = useProductServices();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const popularResponse = await productServices.getProductsByCategory('mobile-accessories');
        setPopularProducts(popularResponse.data.products);
        const newResponse = await productServices.getProductsByCategory("kitchen-accessories");
        setNewProducts(newResponse.data.products);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingSpinner>Loading...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header />
        <ContainerSection>
          <p>{error}</p>
        </ContainerSection>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Carousel images={images} />
      
      <SectionWrapper>
        <ContainerSection>
          <SectionTitle>🔥 Product Terpopuler</SectionTitle>
          <Slider>
            {popularProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </Slider>
        </ContainerSection>
      </SectionWrapper>

      <SectionWrapper>
        <ContainerSection>
          <SectionTitle>✨ Product Terbaru</SectionTitle>
          <Slider>
            {newProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </Slider>
        </ContainerSection>
      </SectionWrapper>
    </Container>
  );
};

export default Home;
