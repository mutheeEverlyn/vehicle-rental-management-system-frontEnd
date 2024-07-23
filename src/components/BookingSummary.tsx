import React, { useEffect, useState } from 'react';
import { useGetBookingsQuery,TBookedVehicles } from '../features/vehicles/BookingsApi';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the  Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BookingSummary: React.FC = () => {
  const { data: bookings, isLoading, isError } = useGetBookingsQuery();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (bookings) {
      const labels = bookings.map((booking: TBookedVehicles) => booking.booking_date);
      const data = bookings.map((booking: TBookedVehicles) => booking.total_amount);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total Amount',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [bookings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div className="chart-container">
      <h2 className="text-xl mb-4">Booking summary</h2>
      {chartData ? <Bar data={chartData} /> : <div>No data available</div>}
    </div>
  );
};

export default BookingSummary;
