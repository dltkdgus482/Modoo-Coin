  // Utils
  import { closePosition } from '../../utils/positionUtils';

  // Libraries
  import styled from 'styled-components';

  // Components
  import PositionItemInfo from './PositionItemInfo';
  import { calBenefit,getEntryPrice } from '../../utils/trade';

  const PositionItem = ({ position, tradeData, balance, setBalance, positionArray, setPositionArray }) => {
    const benefit = calBenefit(position,tradeData);
    const entryPrice = getEntryPrice( position,tradeData);
    // ✅ 포지션 정리 버튼 클릭 핸들러
    const handleClosePosition = () => {
      const result = closePosition(benefit, balance, entryPrice); // ✅ 새 잔고 값 반환
      setBalance(result.curBalance); // ✅ `setBalance` 실행
      console.log("✅ 청산 후 현재잔고 : " + result.curBalance);
      // ✅ 현재 배열에서 선택한 포지션 제거
      setPositionArray(positionArray.filter(pos => pos !== position));
    };
    
    return (
      <Container>
        <PositionItemInfo position={position} benefit={benefit}/>
        <Button onClick={() => handleClosePosition()}>Close</Button>
      </Container>
    );
  };

  export default PositionItem;

  // Styled Components
  const Container = styled.div`
    width: 40%;
    min-width: 140px;
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #008485;
    box-shadow: 4px 4px 10px rgba(0, 132, 133, 0.2);
    background-color: white;
  `;

  const Button = styled.button`
    cursor: pointer;
    width: 80%;
    height: 20%;
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