// Libraries
import styled from 'styled-components';

// Components
import PositionItemInfo from './PositionItemInfo';

const PositionItem = ({ position, handleClose }) => {
  return (
    <Container>
      <PositionItemInfo position={position} />
      <Button onClick={handleClose}>Close</Button>
    </Container>
  );
};

export default PositionItem;

// Styled Components
const Container = styled.div`
  width: 92%;
  min-height: 30%;
  max-height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #008485;
  box-shadow: 4px 4px 10px rgba(0, 132, 133, 0.2);
  background-color: white;
  margin: 0 2%;
  padding: 0 2%;
`;

const Button = styled.button`
  cursor: pointer;
  width: 20%;
  height: 80%;
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
