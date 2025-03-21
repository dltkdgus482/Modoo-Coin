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


const Detail = styled.div`
  display: flex;
  align-items: center;
`;
