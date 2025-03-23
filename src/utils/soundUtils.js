// utils/sound.js

let backgroundAudio = null;

/**
 * 일반 효과음 재생 함수
 * @param {string} audioFile - 오디오 파일 경로
 * @param {number} currentTime - 시작 위치 (초)
 */
export const playSound = (audioFile, currentTime = 0) => {
  try {
    const audio = new Audio(audioFile);
    audio.currentTime = currentTime;
    audio.volume = 0.2;
    audio.play();
  } catch (e) {
    console.error('❌ Failed to play sound:', e);
  }
};

/**
 * 배경음악 재생 함수 (반복재생)
 * @param {string} audioFile - 배경음 파일 경로
 */
export const playBackGroundSound = (audioFile) => {
  try {
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }

    backgroundAudio = new Audio(audioFile);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.2;
    backgroundAudio.play();
  } catch (e) {
    console.error('❌ Failed to play background sound:', e);
  }
};

/**
 * 배경음악 정지 함수
 */
export const stopBackGroundSound = () => {
  if (backgroundAudio) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
  }
};
