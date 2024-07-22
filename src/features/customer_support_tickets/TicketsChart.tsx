import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartData, ChartOptions, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';
import { useGetCustomerSupportTicketsQuery, Tticket } from './TicketApi';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface TicketsChartProps {
  user_id: number;
}

const TicketsChart: React.FC<TicketsChartProps> = ({ user_id }) => {
  const { data: tickets, error, isLoading, isError } = useGetCustomerSupportTicketsQuery();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (tickets) {
      const userTickets = tickets.filter((ticket: Tticket) => ticket.user_id === user_id);
      const statusCounts: { [key: string]: number } = {};

      userTickets.forEach((ticket: Tticket) => {
        statusCounts[ticket.status] = (statusCounts[ticket.status] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: 'Number of Tickets',
            data: Object.values(statusCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [tickets, user_id]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef.current && chartData.labels && chartData.labels.length > 0) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        } as ChartOptions<'bar'>,
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.data?.message || 'An error occurred'}</div>;

  return (
    <div className="chart-container">
      <h2>Tickets Overview</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TicketsChart;
