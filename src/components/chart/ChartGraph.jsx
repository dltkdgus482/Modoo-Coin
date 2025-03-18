import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Ticks } from "chart.js";
import styled from "styled-components";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartGraph = ({ cryptoName, cryptoPrice }) => {
    const maxDataPoints = 100;
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: `${cryptoName} 가격`,
                data: [],
                borderColor: "#0072bc",
                backgroundColor: "rgba(0, 114, 188, 0.2)",
                borderWidth: 2,
            },
        ],
    });
    const [currentCrypto, setCurrentCrypto] = useState(cryptoName);

    useEffect(() => {
        if (!cryptoName || !cryptoPrice) return;

        if (cryptoName !== currentCrypto) {
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: `${cryptoName} 가격`,
                        data: [],
                        borderColor: "#0072bc",
                        backgroundColor: "rgba(0, 114, 188, 0.2)",
                        borderWidth: 2,
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

        const interval = setInterval(updateChart, 1000);

        return () => clearInterval(interval);
    }, [cryptoPrice]);

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    display: false,
                }
            },
            y: {
                beginAtZero: false,
            },
        },
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <ChartWrapper>
            <Line data={chartData} options={chartOptions} />
        </ChartWrapper>
    );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 300px;
  overflow: hidden;
`;

export default ChartGraph;
