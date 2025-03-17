// Libraries
import styled from "styled-components";

const PositionItemInfo = ({ position }) => {
  return (
    <>
      <p>{position.coinName}</p>
      <p>{position.quantity}</p>
      <p>{position.entryPrice.toLocaleString()} $</p>
      <p>{position.orderType}</p>
      <p>profit</p>
    </>
  );
};

export default PositionItemInfo;
