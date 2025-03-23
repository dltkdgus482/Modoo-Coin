// Libraries
import styled from 'styled-components';
import buySound from '@/assets/sounds/buy.mp3';

// Utils
import { lightenColor } from '../../utils/tradeUtils';
import { useToast } from '../../hooks/useToast';
import { playSound } from '../../utils/soundUtils';

const TradeButton = ({ handleEnter, selectedCoinKey, quantity }) => {
  const { toast } = useToast();

  const handleClick = (type) => {
    playSound(buySound);
    handleEnter(type);
    toast({
      title: `${selectedCoinKey} Short x${quantity} buy`,
      description: '',
    });
  }

  return (
    <Container>
      <StyledButton
        style={{ backgroundColor: '#008485' }}
        onClick={() => {handleClick('short')}}
      >
        Long
      </StyledButton>
      <StyledButton
        style={{ backgroundColor: '#0072bc' }}
        onClick={() => {handleClick('long')}}
      >
        Short
      </StyledButton>
    </Container>
  );
};

export default TradeButton;

// Other Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50%;
`;

const StyledButton = styled.button`
  width: min(48%);
  height: min(30px, 100%);
  color: white;
  font-size: 100%;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) =>
      props.color ? lightenColor(props.color, 20) : '#008485'};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
`;
