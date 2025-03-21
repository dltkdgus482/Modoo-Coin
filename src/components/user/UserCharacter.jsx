// Libraries
import styled from "styled-components";

// Assets
import CharacterImage from '@/assets/images/character1.png'

const UserCharacter = () => {
  return (
    <Container>
      <Image src={CharacterImage} />
    </Container>
  );
};

export default UserCharacter;

// Styled Components
const Container = styled.div`
  width: 92%;
  height: 44%;
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