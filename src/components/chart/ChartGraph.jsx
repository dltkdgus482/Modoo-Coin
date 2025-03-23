import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Ticks,
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ChartGraph = ({ cryptoName, cryptoPrice }) => {
  const maxDataPoints = 100;
  const priceRef = useRef(cryptoPrice); // ✅ 가격 저장용

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `${cryptoName} 가격`,
        data: [],
        borderColor: '#008485',
        backgroundColor: 'rgba(0, 114, 188, 0.2)',
        borderWidth: 2,
        borderDash: [2, 2], 
        tension: 0,       
        fill: true,
      },
    ],
  });

  const [currentCrypto, setCurrentCrypto] = useState(cryptoName);

  // ✅ cryptoPrice가 바뀔 때마다 참조값 업데이트
  useEffect(() => {
    priceRef.current = cryptoPrice;
  }, [cryptoPrice]);


  useEffect(() => {
    if (!cryptoName || !cryptoPrice) return;
  
    if (cryptoName !== currentCrypto) {
      setChartData({
        labels: [new Date().toLocaleTimeString()], // ⬅ 초기 라벨 추가
        datasets: [
          {
            label: `${cryptoName} 가격`,
            data: [cryptoPrice], // ⬅ 초기 데이터
            borderColor: '#008485',
            backgroundColor: 'rgba(0, 114, 188, 0.2)',
            fill: true,
          },
        ],
      });
      setCurrentCrypto(cryptoName);
    }
  }, [cryptoName]);

  useEffect(() => {
    if (!cryptoPrice) return;

    const updateChart = () => {
      const newTime = new Date().toLocaleTimeString();
      const newPrice = cryptoPrice;

      setChartData((prevData) => {
        let updatedLabels = [...prevData.labels, newTime];
        let updatedPrices = [...prevData.datasets[0].data, newPrice];

        if (updatedPrices.length > maxDataPoints) {
          updatedLabels.shift();
          updatedPrices.shift();
        }

        return {
          ...prevData,
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedPrices,
            },
          ],
        };
      });
    };

    const interval = setInterval(updateChart, 500);

    return () => clearInterval(interval);
  }, [cryptoPrice]);

  const chartOptions = {
    layouts: {},
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
      },
      plugins: {
        legend: { display: false },
      },
    },
  };

  return (
    <ChartWrapper>
      <Line
        data={chartData}
        options={chartOptions}
        style={{
          width: '100%',
          height: '100%',
          border: '2px solid #008485',
          backgroundColor: 'white',
        }}
      />
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ChartGraph;
