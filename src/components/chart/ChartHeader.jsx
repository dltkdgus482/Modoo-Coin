import styled from "styled-components";

const ChartHeader = (({ cryptoName, cryptoPrice }) => {
    return (
        <Header>
            <div>{cryptoName}</div>
            <div>{cryptoPrice}</div>
        </Header>
    );
})

export default ChartHeader

const Header = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2%;
    padding-right: 2%;
    background-color:  #008485;
`
