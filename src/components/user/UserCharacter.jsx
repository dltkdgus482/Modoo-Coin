// Libraries
import styled from "styled-components";

// Assets
import { calculateProfit } from "../../utils/calculateProfit";
import { calculateLevel } from "../../utils/calculateLevel";
import { findCharacter } from "../../utils/findCharacter";

const UserCharacter = ({balance, positionArray}) => {
  const profit = calculateProfit(balance, positionArray);
  const level = calculateLevel(profit);
  const currentCharacterImage = findCharacter(level);
  return (
    <Container>
      <Image src={currentCharacterImage} />
    </Container>
  );
};

export default UserCharacter;

// Styled Components
const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #008485;
  border-right: 1.5 solid #008485;
  background-color: white;
`;

const Image = styled.img`
  width: auto;
  height: 80%;
`;