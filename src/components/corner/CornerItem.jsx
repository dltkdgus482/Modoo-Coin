// Libraries
import styled from 'styled-components';

const CornerItem = ({ position }) => {
  return <Corner position={position} />;
};

export default CornerItem;

// Styled Components
const Corner = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case 'LU':
        return `
          top: -5px;
          left: -5px;
          border-top: 10px solid #008485;
          border-left: 10px solid #008485;
        `;
      case 'RU':
        return `
          top: -5px;
          right: -5px;
          border-top: 10px solid #008485;
          border-right: 10px solid #008485;
        `;
      case 'RL':
        return `
          bottom: -5px;
          right: -5px;
          border-bottom: 10px solid #008485;
          border-right: 10px solid #008485;
        `;
      case 'LL':
        return `
          bottom: -5px;
          left: -5px;
          border-bottom: 10px solid #008485;
          border-left: 10px solid #008485;
        `;
      default:
        return '';
    }
  }}
`;
