// Libraries
import styled from 'styled-components';

// Other Components
import UserCharacter from './UserCharacter';
import UserInfo from './UserInfo';
import CornerList from '../corner/CornerList';

const UserContainer = () => {
  return (
    <Container>
      <UserCharacter />
      <UserInfo />
      <CornerList />
    </Container>
  );
};

export default UserContainer;

// Styled Components
const Container = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  border: 3px solid black;
  background-color: #e9f2f1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4%;
`;
