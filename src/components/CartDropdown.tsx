import React from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  z-index: 1000;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: #333;
`;

const Price = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #007bff;
  font-weight: bold;
`;

const Quantity = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

const RemoveButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  background: #dc3545;
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const Summary = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:last-child {
    margin-bottom: 0;
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.primary ? '#28a745' : '#dc3545'};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.primary ? '#218838' : '#c82333'};
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, checkout } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity * 16000);
    }, 0);
  };

  const handleCheckout = () => {
    const success = checkout();
    
    if (success) {
      Swal.fire({
        title: 'Success!',
        text: `Checkout successful!`,
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

  const handleClearCart = () => {
    clearCart();
    onClose();
  };

  if (cart.length === 0) {
    return (
      <DropdownContainer>
        <EmptyCart>Your cart is empty</EmptyCart>
      </DropdownContainer>
    );
  }

  return (
    <DropdownContainer>
      {cart.map((item) => (
        <CartItem key={item.id}>
          <ProductImage src={item.product.thumbnail} alt={item.product.title} />
          <ProductInfo>
            <ProductName>{item.product.title}</ProductName>
            <Price>
              Rp {(item.product.price * 16000).toLocaleString('id-ID')}
              <Quantity> × {item.quantity}</Quantity>
            </Price>
          </ProductInfo>
          <RemoveButton onClick={() => removeFromCart(item.product.id)}>×</RemoveButton>
        </CartItem>
      ))}

      <Summary>
        <SummaryRow>
          <span>Total ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
          <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
        </SummaryRow>
      </Summary>

      <ButtonGroup>
        <Button onClick={handleClearCart}>Clear Cart</Button>
        <Button primary onClick={handleCheckout}>Checkout</Button>
      </ButtonGroup>
    </DropdownContainer>
  );
};

export default CartDropdown;
