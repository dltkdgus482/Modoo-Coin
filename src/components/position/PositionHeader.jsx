import { useState, useRef } from 'react';

// Libraries
import styled from 'styled-components';
import basicSound from '@/assets/sounds/basic.mp3';

// Modal
import HistoryModal from '../modal/HistoryModal.jsx';

const PositionHeader = ({tradeDataHistory, setTradeDataHistory}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const audioRef = useRef(new Audio(basicSound));
  const handleClick = () => {
    audioRef.current.currentTime = 0.4;
    audioRef.current.play();
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <Container>
      <Header>My Positions</Header>
      <ClearButton onClick={handleClick}>My History</ClearButton>
      {isModalOpen && <HistoryModal onClose={() => setIsModalOpen(false)} tradeDataHistory={tradeDataHistory} setTradeDataHistory={setTradeDataHistory}/>}
    </Container>
  );
};

export default PositionHeader;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.p`
  color: #008485;
  font-size: 120%;
  font-weight: bold;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
`;

const ClearButton = styled.button`
  padding: 8px 15px;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  background-color: #008485;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #005f5f;
  }
`;
