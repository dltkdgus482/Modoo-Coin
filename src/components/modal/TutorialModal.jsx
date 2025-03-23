import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { playSound } from '@/utils/soundUtils';
import clickSound from '@/assets/sounds/basic.mp3';

const TutorialModal = ({ onClose, refs, positionArray, setPositionArray }) => {
  const [step, setStep] = useState(0);
  const dummyPositionKey = 'TUTORIAL_BTC';

  const tutorialSteps = [
    { title: '📈 COINLIST', desc: 'Pick a coin, any coin!', ref: refs.coinListRef },
    { title: '🟢 LONG', desc: 'DDUKSANG? Go LONG and ride the wave up! 🚀', ref: refs.longButtonRef },
    { title: '🔴 SHORT', desc: 'DDUKLAK? Hit SHORT and profit on the fall! 💥', ref: refs.shortButtonRef },
    { title: '🧹 CLOSE', desc: 'SONJEOLGAK? Click CLOSE ! 💰', ref: refs.clearButtonRef },
  ];

  // ✅ 하이라이트 + 더미 포지션 생성 로직
  useEffect(() => {
    const currentStep = tutorialSteps[step];

    // 더미 포지션 추가 (clear 버튼 단계에서만)
    const dummyExists = positionArray.some((pos) => pos.id === dummyPositionKey);
    if (currentStep.ref === refs.clearButtonRef && !dummyExists) {
      const dummy = {
        id: dummyPositionKey,
        coinName: 'KRW-BTC',
        orderType: 'long',
        entryPrice: 1000000,
        quantity: 1,
        timestamp: Date.now(),
      };
      setPositionArray((prev) => [...prev, dummy]);
    }

    // 💡 렌더 이후 하이라이팅 (지연 필요)
    const timeout = setTimeout(() => {
    const target = currentStep?.ref?.current;
    if (target) {
      target.style.outline = '3px solid yellow';
      target.style.zIndex = '9999';
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },100);


    // ✅ 진짜 cleanup 함수는 여기
    return () => {
        clearTimeout(timeout);
        const prevTarget = currentStep?.ref?.current;
        if (prevTarget) {
          prevTarget.style.outline = 'none';
          prevTarget.style.zIndex = '';
        }
      };
    }, [step, positionArray]);

  const handleNext = () => {
    playSound(clickSound, 0.3);

    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      // 마지막 단계: 튜토리얼 종료 및 더미 포지션 제거
      setPositionArray((prev) => prev.filter((pos) => pos.id !== dummyPositionKey));
      onClose();
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <h2>{tutorialSteps[step].title}</h2>
        <p>{tutorialSteps[step].desc}</p>
        <TutorialButton onClick={handleNext}>
          {step === tutorialSteps.length - 1 ? '🎮 START' : 'NEXT ▶'}
        </TutorialButton>
      </ModalBox>
    </Overlay>
  );
};

export default TutorialModal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  font-family: 'Press Start 2P', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px;
  border: 3px solid #008485;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  color: #333;
  position: relative;
  top: -60px;
`;

const TutorialButton = styled.button`
  margin-top: 20px;
  font-size: 12px;
  padding: 10px 20px;
  font-family: 'Press Start 2P', monospace;
  background-color: #00ff88;
  color: black;
  border: 2px solid #008844;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #006644;
    color: white;
  }
`;
