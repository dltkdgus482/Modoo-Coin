// Libraries
import styled from 'styled-components';

// Other Components
import UserInfoDetail from './UserInfoDetail';


const UserInfo = ({inputName, balance}) => {
  return (
    <Container>
      <UserInfoDetail title={'Name'} content={inputName} ></UserInfoDetail>
      <UserInfoDetail title={'Level'} content={inputName} ></UserInfoDetail>
      <UserInfoDetail title={'Deposit'} content={balance} ></UserInfoDetail>
      <UserInfoDetail title={'Profit'} content={balance} ></UserInfoDetail>
      <UserInfoDetail title={'Rank'} content={balance} ></UserInfoDetail>
    </Container>
  );
};

export default UserInfo;

// Styled Components
const Container = styled.div`
  width: 50%;
  height: 100%;
  padding: 0% 2%;
  border: 3px solid #008485;
  border-left: 1.5px solid #008485;

  display:flex;
  flex-direction: column;
`;
