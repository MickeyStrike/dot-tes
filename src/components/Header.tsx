import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartDropdown from './CartDropdown';

const HeaderContainer = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Logo = styled.img`
  height: 46px;
  width: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;

  &:focus-within {
    border-color: #4CAF50;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: #4CAF50;
  color: white;
  white-space: nowrap;

  &:hover {
    background: #45a049;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 150px;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  color: #333;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #4CAF50;
  }
`;

const CartContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  position: relative;

  &:hover {
    color: #4CAF50;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [showMenu, setShowMenu] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const menuRef = React.useRef<HTMLDivElement>(null);
  const cartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAehqLr_Cx6kkhGDueNSsCvspUrhgxXaiOg&s"
          alt="Logo"
          onClick={handleLogoClick}
        />

        <SearchContainer>
          <SearchBar>
            <SearchInput placeholder="Search products..." />
          </SearchBar>
        </SearchContainer>

        <AuthContainer>
          {isAuthenticated ? (
            <>
              <CartContainer ref={cartRef}>
                <CartButton onClick={() => setShowCart(!showCart)}>
                  <CartIcon />
                  {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
                </CartButton>
                {showCart && <CartDropdown onClose={() => setShowCart(false)} />}
              </CartContainer>
              <UserMenu ref={menuRef}>
                <Button onClick={() => setShowMenu(!showMenu)}>My Account</Button>
                {showMenu && (
                  <UserMenuDropdown>
                    <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </UserMenuDropdown>
                )}
              </UserMenu>
            </>
          ) : (
            <Button onClick={() => navigate('/login')}>Login</Button>
          )}
        </AuthContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
