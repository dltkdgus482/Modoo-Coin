// Libraries
import styled from 'styled-components';

// Other Components
import LogInfo from './LogInfo';

const UserInfo = ({logData}) => {
  return (
    <Container>
      <LogInfo
        logData= {logData}
      />
    </Container>
  );
};

export default UserInfo;

// Styled Components
const Container = styled.div`
  width: 92%;
  height: 44%;
  border: 3px solid #008485;
`;
