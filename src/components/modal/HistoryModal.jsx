import { useRef } from 'react';

import styled from 'styled-components';
import basicSound from '@/assets/sounds/basic.mp3';

const HistoryModal = ({ onClose, tradeDataHistory, setTradeDataHistory }) => {
    
    const audioRef = useRef(new Audio(basicSound));

    const playSound = () => {
        audioRef.current.currentTime = 0.4;
        audioRef.current.play();
    };

    const createHistory = (trade, index) => {
        const parsedDate = new Date(trade.clearTime);
        
      
        const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
      
        const formattedTime = `${parsedDate.getHours().toString().padStart(2, '0')}:${parsedDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${parsedDate.getSeconds().toString().padStart(2, '0')}`;
      
        const benefitValue = parseFloat(trade.benefit);
        const isProfit = benefitValue >= 0;
      
        return (
          <TradeItem key={index}>
            <div>
              🪙 <strong>CoinName</strong> :{' '}
              <Highlight>{trade.coinName}</Highlight>
            </div>
            <div>
              💰 <strong>EnterPrice</strong> :{' '}
              <Highlight>{parseInt(trade.entryPrice).toLocaleString()}</Highlight>
            </div>
            <div>
              🔄 <strong>ClearPrice</strong> :{' '}
              <Highlight>{parseInt(trade.clearPrice).toLocaleString()}</Highlight>
            </div>
            <div>
              {trade.benefit !== undefined && (
                <>
                  {isProfit ? (
                    <ProfitText>✅ Benefit : +{parseInt(trade.benefit).toLocaleString()}</ProfitText>
                  ) : (
                    <LossText>❌ Loss : {parseInt(trade.benefit).toLocaleString()}</LossText>
                  )}
                </>
              )}
            </div>
            <div>
              📅 Date : {formattedDate} 🕒 {formattedTime}
            </div>
          </TradeItem>
        );
      };
          

  return (
    <Overlay>
      <ModalBox>
      <Header>
        <span>📜 Trade History</span>
        <HeaderButtons>
            <ClearBtn onClick={() => {
                playSound();
                setTradeDataHistory([]);
            }}>🧹 Clear</ClearBtn>
            <CloseBtn onClick={() => {
                playSound();
                onClose();
            }}>❌</CloseBtn>
        </HeaderButtons>
    </Header>
        
        <Content>
          {tradeDataHistory.length > 0 ? (
            <HistoryList>
              {tradeDataHistory.map((trade, index) => createHistory(trade, index))}
            </HistoryList>
          ) : (
            <NoHistory>🚫 No trade history available</NoHistory>
          )}
        </Content>
      </ModalBox>
    </Overlay>
  );
};

export default HistoryModal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 450px; /* ✅ 모달 너비 고정 */
  height: 500px; /* ✅ 모달 높이 고정 */
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Content = styled.div`
  overflow-y: auto; /* ✅ 스크롤 가능하도록 설정 */
  padding-right: 2px; /* 스크롤바와의 간격 */
  background-color:rgb(142, 160, 147);
  border-radius: 10px;
`;

const HistoryList = styled.div`
  max-height: 430px; /* ✅ 내용 영역 높이 제한 */
  gap: 20px;
`;

const TradeItem = styled.div`
  padding: 8px;
  border-bottom: 2px solid rgb(255, 255, 255);
  font-size: 10px;
  font-weight: normale;
`;

const NoHistory = styled.p`
  text-align: center;
  color: #777;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ClearBtn = styled.button`
  background-color:rgb(142, 160, 147);
  color: black;
  font-weight: bold;
  border: none;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;

  &:hover {
    background-color:rgb(60, 114, 82);
  }
`;

const Highlight = styled.span`
  color: #1b1b1b;
  font-weight: bold;
`;

const ProfitText = styled.span`
  color: #1e8f3f;
  font-weight: bold;
`;

const LossText = styled.span`
  color: #b22222;
  font-weight: bold;
`;

