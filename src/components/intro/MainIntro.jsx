import styled from 'styled-components';

import { playSound } from '../../utils/soundUtils';

import CoinImg from '@/assets/images/coin.png';
import Character from '@/assets/images/cha1.png';
import Character2 from '@/assets/images/cha2.png';
import GameStart from '@/assets/sounds/gamestart.mp3';


const IntroScreen = ({ onStart }) => {

    const handleStartClick = () => {
        playSound(GameStart,0.3);
        onStart();
    };

  return (
    <Wrapper>
    <Overlay>
        <Content>
        <CharacterWrapper>
            <FloatingCharacter src={Character} alt="character1" />
            <LargeCoin src={CoinImg} alt="coin" />
            <FloatingCharacter src={Character2} alt="character2" />
        </CharacterWrapper>
        <Title>
        {Array.from('🪙 MoDoo Coin 🪙').map((char, index) => (
            <WaveText key={index} index={index}>{char}</WaveText>
        ))}
        </Title>
        <StartButton onClick={handleStartClick}>▶ Game Start</StartButton>
        </Content>
    </Overlay>
    </Wrapper>

  );
};

export default IntroScreen;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-image: url('https://www.transparenttextures.com/patterns/pixel-weave.png');
  background-color: rgb(70, 121, 85);
  background-repeat: repeat;
  animation: scrollBackground 20s linear infinite;

  @keyframes scrollBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 500px 500px;
    }
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Press Start 2P', monospace;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 200px;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #ffdd33;
  margin-bottom: 24px;
  text-shadow:
    2px 2px 0 #000,
    4px 4px 0 #333;
`;

const StartButton = styled.button`
  font-size: 20px;
  padding: 12px 24px;
  background-color: #00ff88;
  font-family: 'Press Start 2P', monospace;
  color: black;
  border: 3px solid #008844;
  border-radius: 6px;
  cursor: pointer;
  text-shadow: 1px 1px 0 #fff;
  box-shadow: 2px 2px 0 #222;

  &:hover {
    background-color: #006644;
    color: white;
  }
`;

const CharacterWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 40px;
  align-items: flex-end;
  justify-content: center;
`;

const FloatingCharacter = styled.img`
  width: 500px;
  animation: floatCharacter 2.5s ease-in-out infinite;

  @keyframes floatCharacter {
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  }
`;

const LargeCoin = styled.img`
  width: 350px;
  height: auto;
  animation: spin 4s linear infinite;

  @keyframes spin {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }
`;


const WaveText = styled.span`
  display: inline-block;
  animation: wave 1.5s ease-in-out infinite;
  animation-delay: ${({ index }) => index * 0.1}s;

  @keyframes wave {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;