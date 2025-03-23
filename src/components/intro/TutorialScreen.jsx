import styled from 'styled-components';
import screen from '@/assets/images/fullsc.jpg'
import clickSound from '@/assets/sounds/basic.mp3';

const TutorialScreen = ({ onFinish }) => {
  const handleClick = () => {
    const sound = new Audio(clickSound);
    sound.volume = 0.5;
    sound.play();
    onFinish();
  };

  return (
    <Wrapper>
      <Image src={screen} alt="Tutorial Step" />
      <CheckBox>
        <Text>💡 원하는 코인을 클릭해서 정보를 확인하고 거래를 시작하세요!</Text>
        <NextButton onClick={handleClick}>▶ Start Trading</NextButton>
      </CheckBox>
      
    </Wrapper>
  );
};

export default TutorialScreen;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #222;
  color: white;
  font-family: 'Press Start 2P', monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 90%;
  heigth: 90%;
  margin-bottom: 24px;
`;

const CheckBox = styled.div`
  position : absolute;
`;
const Text = styled.p`
  font-size: 12px;
  margin-bottom: 24px;
`;

const NextButton = styled.button`
  padding: 12px 20px;
  font-size: 10px;
  background-color: #00ff88;
  border: 2px solid #00cc66;
  font-family: 'Press Start 2P', monospace;
  cursor: pointer;

  &:hover {
    background-color: #009966;
    color: white;
  }
`;
