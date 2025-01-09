import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 183px;
`;

const CardContainer = styled.div`
  border: 1px solid #b0b0b03b;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  padding-bottom: 10px;
  transition: all 0.3s;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  position: relative;
`;

const ProductImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

const ProductTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #333;
`;

const Price = styled.p`
  margin: 5px 0;
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const DiscountContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const DiscountBadge = styled.span`
  background-color: #E64325;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 500;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #b0b0b0;
  font-size: 10px;
`;

const Brand = styled.p`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;

const Location = styled.p`
  font-size: 10px;
  color: #555;
`;

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage?: number;
  brand?: string;
}

interface CardProps {
  product: Product;
}

const Card: FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();

  const priceAfterDiscount = useMemo(() => {
    const basePrice = product.price * 16000;
    return basePrice - (basePrice * (Math.ceil(product.discountPercentage || 0) / 100));
  }, [product]);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <CardContainer>
        <ImageContainer>
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            className="active"
          />
        </ImageContainer>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <Price>
            {priceAfterDiscount.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Price>
          {product.discountPercentage && (
            <DiscountContainer>
              <DiscountBadge>{Math.ceil(product.discountPercentage)}%</DiscountBadge>
              <OriginalPrice>
                {(product.price * 16000).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </OriginalPrice>
            </DiscountContainer>
          )}
          <Brand>{product.brand || 'Evermos'}</Brand>
          <Location>BANDUNG BARAT</Location>
        </ProductInfo>
      </CardContainer>
    </CardWrapper>
  );
};

export default Card;
