// Libraries
import styled from 'styled-components';

// Other Components

const UserInfoDetail = ({title, content}) => {
  let value = content;
  switch (title) {
      case 'Deposit': {
          value = `${content.toLocaleString('ko-KR')} KRW`;
          break;
      }
      case 'Profit': {
          value = `${content.toLocaleString('ko-KR')} KRW`;
          break;
      }
  }
  return (
    <Container>
        <DetailTitle>{title}</DetailTitle>
        <DetailValue>{value}</DetailValue>
    </Container>
  );
};

export default UserInfoDetail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailTitle = styled.div`
  display: flex;
  align-self: flex-start;
`;

const DetailValue = styled.div`
  display: flex;
  align-self: flex-end;
`;
