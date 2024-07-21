import React from 'react';
import TicketStatusChart from './TicketStatusChart';
import { useGetCustomerSupportQuery } from '../features/customer_support_tickets/CustomerSupportAPI';

const Admin: React.FC = () => {
  const { data, error, isLoading, isError } = useGetCustomerSupportQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'An error occurred'}</div>;
  }

  return (
    <div className='min-h-screen'>
      <TicketStatusChart data={data || []} />
    </div>
  );
};

export default Admin;
