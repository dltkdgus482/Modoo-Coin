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

const Modal = ({ setIsVisible, setInputName }) => {
  const [tempName, setTempName] = useState('');

  const handleConfirm = () => {
    if (tempName.trim()) {
      setInputName(tempName.trim());
      setIsVisible(false);
    } else {
      alert('이름을 입력해주세요!');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

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
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ex) 홍길동"
          autoFocus
        />
        <StyledButton
          style={{ backgroundColor: '#008485' }}
          onClick={handleConfirm}
        >
          확인
        </StyledButton>
      </Container>
    </>
  );
};

export default Modal;
