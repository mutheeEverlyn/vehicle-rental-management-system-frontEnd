import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { TcustomerSupport } from '../features/customer_support_tickets/CustomerSupportAPI';

interface TicketStatusChartProps {
  data: TcustomerSupport[];
}

const TicketStatusChart: React.FC<TicketStatusChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data.length > 0) {
      // Count tickets by status
      const statusCounts = data.reduce((acc: any, ticket: TcustomerSupport) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(statusCounts);
      const dataValues = Object.values(statusCounts);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Ticket Status',
            data: dataValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl mb-4">Ticket Status Distribution</h2>
      {chartData ? <Bar data={chartData} /> : <div>No data available</div>}
    </div>
  );
};

export default TicketStatusChart;
