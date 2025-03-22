import React from 'react';
import styled from 'styled-components';
import CornerList from '../corner/CornerList';

export function Toast({ title, description }) {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <CornerList></CornerList>
    </Container>
  );
}

// styled-components
const Container = styled.div`
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace !important;
  padding: 16px;
  max-width: 364px;
  width: 100%;
  border: 3px solid black;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
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
