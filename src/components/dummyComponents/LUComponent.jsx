// Libraries
import styled from 'styled-components';
import UserCharacter from '../user/UserCharacter';
import UserInfo from '../user/UserInfo';
import LogContainer from '../log/LogContainer';
import CornerList from '../corner/CornerList';

// Other Components


const LUComponent = ({inputName, balance, logData, positionArray}) => {
  return (
    <Container>
      <UserContainer>
        <UserCharacter />
        <UserInfo 
          inputName={inputName}
          balance={balance}
          positionArray={positionArray}
        />
      </UserContainer>
      <LogContainer logData={logData}></LogContainer>
      <CornerList />
    </Container>
  );
};

export default LUComponent;

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

const UserContainer = styled.div`
  width: 92%;
  height: 44%;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`