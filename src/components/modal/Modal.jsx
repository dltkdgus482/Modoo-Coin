// Assets
import Image from '../../assets/images/character1.png';

// Libraries
import { useState } from 'react';

// Styled Components
import {
  Container,
  Overlay,
  StyledText,
  StyledImage,
  StyledInput,
  StyledButton,
} from './ModalStyles';

const Modal = ({ setIsVisible }) => {
  const [inputName, setInputName] = useState('굿굿티비');

  return (
    <>
      <Overlay />
      <Container>
        <StyledText style={{ fontSize: '200%', fontWeight: 'bold' }}>
          이름을 입력하세요.
        </StyledText>
        <StyledText>
          모두의 코인 서비스를 이용하시려면 이름이 필요합니다.
        </StyledText>
        <StyledImage src={Image} alt="hana-character" />
        <StyledInput
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <StyledButton
          style={{ backgroundColor: '#008485' }}
          onClick={() => setIsVisible(false)}
        >
          확인
        </StyledButton>
      </Container>
    </>
  );
};

export default Modal;
