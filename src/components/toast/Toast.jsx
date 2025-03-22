import React from 'react';
import styled from 'styled-components';

export function Toast({ title, description }) {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Container>
  );
}

// styled-components
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 364px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const Description = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: #6b7280;
`;
