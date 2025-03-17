// Utils
import { closePosition } from '../../utils/positionUtils';

// Libraries
import styled from 'styled-components';

// Components
import PositionItemInfo from './PositionItemInfo';

const PositionItem = ({ position }) => {
  return (
    <Container>
      <PositionItemInfo position={position} />
      <Button onClick={() => closePosition()}>Close</Button>
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
