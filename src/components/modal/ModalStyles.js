// Utils
import { lightenColor } from '../../utils/tradeUtils';

// Libraries
import styled from 'styled-components';

// Styled Components
export const Container = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 25px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 5%;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const StyledText = styled.p``;

export const StyledImage = styled.img`
  width: 20%;
  height: auto;
`;

export const StyledInput = styled.input`
  width: 55%;
  height: 10%;
  border: 2px solid #008485;
  text-align: center;
  padding: 0 2%;
  outline: none;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: #0072bc;
    box-shadow: 0px 0px 8px rgba(0, 114, 188, 0.5);
  }
`;

export const StyledButton = styled.button`
  width: 55%;
  height: min(30px, 100%);
  color: white;
  font-size: 100%;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) =>
      props.color ? lightenColor(props.color, 20) : '#008485'};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
`;
