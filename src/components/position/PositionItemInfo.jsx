// Libraries
import styled from "styled-components";
import { closePosition } from "../../utils/positionUtils";
import { calBenefit } from "../../utils/trade";

const PositionItemInfo = ({ position,benefit}) => {
  return (
    <>
      <p>{position.coinName}</p>
      <p>{position.quantity}</p>  
      <p>{(position.entryPrice || 0).toLocaleString()} $</p>
      <p>{position.orderType}</p>
      <p>profit: {benefit} $</p>
    </>
  );
};

export default PositionItemInfo;
