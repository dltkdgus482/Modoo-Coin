// Libraries
import styled from 'styled-components';

// Other Components
import UserInfoDetail from './UserInfoDetail';
import { calculateProfit } from '../../utils/calculateProfit';
import { calculateLevel } from '../../utils/calculateLevel';


const UserInfo = ({inputName, balance, positionArray}) => {
  const profit = calculateProfit(balance, positionArray); // 초기 금액 기준 수익
  const level = calculateLevel(profit);
  return (
    <Container>
      <UserInfoDetail title={'Name'} content={inputName} ></UserInfoDetail>
      <UserInfoDetail title={'Level'} content={level} ></UserInfoDetail>
      <UserInfoDetail title={'Deposit'} content={balance} ></UserInfoDetail>
      <UserInfoDetail title={'Profit'} content={profit} ></UserInfoDetail>
      <UserInfoDetail title={'Rank'} content={'1'} ></UserInfoDetail>
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
