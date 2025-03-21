    import styled from 'styled-components';
    import { useEffect, useRef } from 'react';

    const LogInfo = ({ logData }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logData]);

    return (
        <Container>
        <ScrollArea ref={scrollRef}>
            {logData.map((log, index) => (
            <StyledLogItem key={index} type={log.type}>
                {log.content}
            </StyledLogItem>
            ))}
        </ScrollArea>
        </Container>
    );
    };

    export default LogInfo;

    const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    `;

    const ScrollArea = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: rgb(216, 231, 229);
    padding: 10px;
    `;

    const StyledLogItem = styled.pre`
    margin: 6px 0;
    padding: 8px;
    font-size: 11px;
    line-height: 1.6;
    white-space: pre-wrap;
    font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
    font-weight: bold;
    border-radius: 6px;
    color: white;

    background-color: ${({ type }) =>
    type === 'none'   ? '#9CB1CF' :   // ✅ 0 원일때 처리(회색)
    type === 'clear-win'   ? '#2e7d32' :   // ✅ 초록색 (승리)
    type === 'clear-loose' ? '#c62828' :   // ✅ 빨간색 (손실)
    type === 'update'      ? '#4B5563' :   // ✅ 회색 (잔고 변경)
    type === 'start'       ? '#6D28D9' :   // ✅ 보라색 (코인 변경 등)
    type === 'enter'       ? '#2055C9' :   // ✅ 파란색 (포지션 진입)
    'black'};
`;
