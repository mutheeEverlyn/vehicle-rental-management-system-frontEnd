import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TicketsChart from "../features/customer_support_tickets/TicketsChart";

const Dashboard: React.FC = () => {
  const { user_id } = useOutletContext<{ user_id: number }>();
  return (
    <div>
      <TicketsChart user_id={user_id} />
    </div>
  );
};

export default Dashboard;
