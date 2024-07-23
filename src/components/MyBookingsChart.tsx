import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartData, ChartOptions, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';
import { useGetBookingsQuery, TBookedVehicles } from '../features/vehicles/BookingsApi';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface MyBookingsChartProps {
  user_id: number;
}

const MyBookingsChart: React.FC<MyBookingsChartProps> = ({ user_id }) => {
  const { data: bookings, error, isLoading, isError } = useGetBookingsQuery();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (bookings) {
      const userBookings = bookings.filter((booking: TBookedVehicles) => booking.user_id === user_id);
      const labels = userBookings.map((booking: TBookedVehicles) => booking.booking_date);
      const data = userBookings.map((booking: TBookedVehicles) => booking.total_amount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Total Amount',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [bookings, user_id]);

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
      <h2>Booking Summary</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyBookingsChart;
