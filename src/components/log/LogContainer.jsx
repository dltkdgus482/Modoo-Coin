// Libraries
import styled from 'styled-components';


// Other Components
import LogInfo from './LogInfo';

const LogContainer = ({logData}) => {
    return (
        <Container>
          <LogInfo logData={logData}></LogInfo>
        </Container>
    )
}

// Styled Components
const Container = styled.div`
  width: 92%;
  height: 44%;
  padding-top: 10px;
  border: 3px solid #008485;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

export default LogContainer;