import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Card from '../components/Card';
import Slider from '../components/Slider';
import useProductServices, { Product } from '../services/productService';
import { useCart } from '../hooks/useCart';
import Swal from 'sweetalert2';

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  width: 100vw;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ProductSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
`;

const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;

const Thumbnail = styled.img<{ active: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#4CAF50' : 'transparent'};
  transition: border-color 0.2s;

  &:hover {
    border-color: #4CAF50;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Brand = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
`;

const Price = styled.p`
  color: #4CAF50;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const DiscountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DiscountBadge = styled.span`
  background: #ffebee;
  color: #f44336;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const OriginalPrice = styled.span`
  color: #999;
  text-decoration: line-through;
  font-size: 1rem;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 1rem 0;
`;

const Stock = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin: 0;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const QuantityButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  color: black;
  font-size: 1.2rem;

  &:hover {
    background: #e0e0e0;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  min-width: 3rem;
  text-align: center;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${props => props.variant === 'primary' ? `
    background: #4CAF50;
    color: white;
    &:hover {
      background: #45a049;
    }
  ` : `
    background: #e8f5e9;
    color: #4CAF50;
    &:hover {
      background: #c8e6c9;
    }
  `}
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ContainerSection = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #dc3545;
  padding: 2rem;
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { getProductById, getProductsByCategory } = useProductServices();
  const { addToCart, buyNow } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        
        // Fetch product details
        const productData = await getProductById(id);
        setProduct(productData.data);
        setSelectedImage(productData.data.thumbnail);

        // Fetch recommendations from the same category
        const recommendationsData = await getProductsByCategory(productData.data.category);
        setRecommendations(
          recommendationsData.data.products.filter(p => p.id !== productData.data.id).slice(0, 10)
        );

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      Swal.fire({
        title: 'Success!',
        text: `Added to cart successfully!`,
        icon: 'success',
        confirmButtonColor: '#4CAF50'
      })
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const success = buyNow(product, quantity);
      if (!success) {
        // User is not logged in
        navigate('/login');
        return;
      }

      Swal.fire({
        title: 'Success!',
        text: `Purchase successful!`,
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#4CAF50'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard');
        }
      });
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingText>Loading product details...</LoadingText>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Header />
        <ErrorText>{error || 'Product not found'}</ErrorText>
      </Container>
    );
  }

  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - product.discountPercentage / 100);

  return (
    <Container>
      <Header />
      <ContentContainer>
        <ProductSection>
          <ImageSection>
            <MainImage src={selectedImage} alt={product.title} />
            <ThumbnailContainer>
              {[product.thumbnail, ...product.images].map((image, index) => (
                <Thumbnail
                  key={index}
                  src={image}
                  alt={`${product.title} - ${index}`}
                  active={image === selectedImage}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </ThumbnailContainer>
          </ImageSection>

          <InfoSection>
            <Brand>{product.brand}</Brand>
            <Title>{product.title}</Title>
            <DiscountContainer>
              <Price>Rp {Math.round(discountedPrice * 16000).toLocaleString('id-ID')}</Price>
              {product.discountPercentage > 0 && (
                <>
                  <DiscountBadge>{Math.round(product.discountPercentage)}% OFF</DiscountBadge>
                  <OriginalPrice>Rp {Math.round(originalPrice * 16000).toLocaleString('id-ID')}</OriginalPrice>
                </>
              )}
            </DiscountContainer>
            <Description>{product.description}</Description>
            <Stock>Stock: {product.stock} units</Stock>
            <QuantityContainer>
              <QuantityButton onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={() => handleQuantityChange(1)}>+</QuantityButton>
            </QuantityContainer>
            <ButtonContainer>
              <Button variant="secondary" onClick={handleAddToCart}>Add to Cart</Button>
              <Button variant="primary" onClick={handleBuyNow}>Buy Now</Button>
            </ButtonContainer>
          </InfoSection>
        </ProductSection>

        <Section>
          <SectionTitle>You Might Also Like</SectionTitle>
          <ContainerSection>
            <Slider>
              {recommendations.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </Slider>
          </ContainerSection>
        </Section>
      </ContentContainer>
    </Container>
  );
};

export default ProductDetail;
