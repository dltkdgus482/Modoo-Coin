// Utils
import { calBenefit,closePosition } from '../../utils/positionUtils';
import { createClearLog } from '../../utils/logUtils';
import { playSound } from '../../utils/soundUtils';

// Libraries
import styled from 'styled-components';
import closeSound from '@/assets/sounds/close.mp3';

// Components
import PositionItemInfo from './PositionItemInfo';
import { useToast } from '../../hooks/useToast';

const PositionItem = ({ position, tradeData, balance, setBalance, positionArray, setPositionArray, setTradeDataHistory, setLogData }) => {
  const { toast } = useToast();
  const benefit = calBenefit(position,tradeData);
  // ✅ 포지션 정리 버튼 클릭 핸들러
  const handleClosePosition = () => {

    const result = closePosition(balance, position, tradeData,benefit); // ✅ 청산 후 히스토리 반환
    setBalance(result.curBalance); // ✅ 잔고 업데이트
    // ✅ 현재 배열에서 선택한 포지션 제거 및 히스토리 생성
    setPositionArray(positionArray.filter(pos => pos !== position));
    let log = createClearLog(result);
    setLogData((prevLog) => [...prevLog,log]);
    //console.log(log);
    setTradeDataHistory((prevHistory) => [...prevHistory, result]);
    playSound(closeSound);
    toast({
      title: `${result.coinName} ${result.orderType} x${result.quantity} sell`,
      description: `${benefit>0 ? '+'+benefit.toLocaleString() : benefit.toLocaleString()} ₩`,
    });
  };
  
  return (
    <Container>
      <PositionItemInfo position={position} benefit={benefit}/>
      <Button onClick={() => {
        handleClosePosition();
      }}>Close</Button>
    </Container>
  );
};

export default PositionItem;

// Styled Components
const Container = styled.div`
  width: 98%;
  min-width: 140px;
  min-height: 55px;
  max-height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid #008485;
  box-shadow: 4px 4px 10px rgba(0, 132, 133, 0.2);
  background-color: white;
`;

const Button = styled.button`
  cursor: pointer;
  width: 15%;
  height: 40%;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #008485;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: #005f5f;
  }

  &:active {
    transform: scale(0.95);
  }
`;