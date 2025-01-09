import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useGlobalContext } from '../providers/stores';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

const DashboardContent = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`;

const ProfileSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  color: #333;
  font-weight: 500;
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PurchaseItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  align-items: center;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div``;

const ProductName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: black
`;

const ProductMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const Price = styled.div`
  font-weight: 500;
  color: #28a745;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const EmptyText = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGlobalContext();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!state.userData) {
    return (
      <Container>
        <Header />
        <EmptyText>User data not found</EmptyText>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <DashboardContent>
        <ProfileSection>
          <Title>Account Details</Title>
          <InfoItem>
            <Label>Name</Label>
            <Value>{state.userData.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email</Label>
            <Value>{state.userData.email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Phone</Label>
            <Value>{state.userData.phone}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Member Since</Label>
            <Value>{new Date(state.userData.joinDate).toLocaleDateString()}</Value>
          </InfoItem>
        </ProfileSection>

        <MainSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <StatCard>
              <StatValue>{state.totalPurchases}</StatValue>
              <StatLabel>Total Items Purchased</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>Rp {state.totalSpent.toLocaleString('id-ID')}</StatValue>
              <StatLabel>Total Amount Spent</StatLabel>
            </StatCard>
          </div>

          <Card>
            <Title>Purchase History</Title>
            {state.purchaseHistory.length === 0 ? (
              <EmptyText>No purchase history yet</EmptyText>
            ) : (
              <PurchaseList>
                {state.purchaseHistory.map((purchase) => (
                  <PurchaseItem key={purchase.id}>
                    <ProductImage src={purchase.product.thumbnail} alt={purchase.product.title} />
                    <ProductInfo>
                      <ProductName>{purchase.product.title}</ProductName>
                      <ProductMeta>
                        Quantity: {purchase.quantity} · {new Date(purchase.date).toLocaleDateString()}
                      </ProductMeta>
                    </ProductInfo>
                    <Price>Rp {purchase.total.toLocaleString('id-ID')}</Price>
                  </PurchaseItem>
                ))}
              </PurchaseList>
            )}
          </Card>
        </MainSection>
      </DashboardContent>
    </Container>
  );
};

export default Dashboard;
