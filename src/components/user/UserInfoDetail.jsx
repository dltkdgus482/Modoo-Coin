// Libraries
import styled from 'styled-components';

// Other Components

const UserInfoDetail = ({title, content}) => {
  let value = content;
  switch (title) {
      case 'Deposit': {
          value = `${content.toLocaleString('ko-KR')} ₩`;
          break;
      }
      case 'Profit': {
          value = `${content.toLocaleString('ko-KR')} ₩`;
          break;
      }
  }
  return (
    <Container>
        <Detail>{title} :</Detail>
        <Detail>{value}</Detail>
    </Container>
  );
};

export default UserInfoDetail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4%;
  position: relative;
  background-color: #e9f2f1;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
`;
